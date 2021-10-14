import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from "rxjs/operators";
import { forkJoin, Observable, of } from 'rxjs';
import { SportDataApiAdapter } from './sportDataApi.adapter';
import { leaguesSelector } from '../store/reducers/leagues.reducer';
import { League } from '../models/league.model';
import { Store } from '@ngrx/store';
import { MatchAdapter } from '../adapters/match.adapter';
import { Competition } from '../models/types/competition';
import { LeagueAdapter } from '../adapters/league.adapter';
import { NativeLeague } from '../models/types/serverModels';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(
    private api: SportDataApiAdapter, 
    private store: Store<any>, 
    private matchAdapter: MatchAdapter,
    private leagueAdapter: LeagueAdapter
  ) { }

  getLeagues(): Observable<League[]> {
    return this.api.getLeagues()
      .pipe(
        switchMap(
          (leagues: NativeLeague[]) => forkJoin(leagues.map(
            (league: NativeLeague) => this.getCountry(league.country_id)
              .pipe(
                map(country => this.leagueAdapter.adapt({...league, country}))
              )
            )
          )
        )
      )
  }

  getCountry(countryId: any) {
    return this.api.getCountryById(countryId);
  }

  getMatchesForLeague(leagueId: any) {
    return this.api.getMatchesForLeague(leagueId)
      .pipe(
        catchError(err => of([]))
      );
  }

  getAllMatches() {
    let leaguesList: League[];
    const competitions: Competition[] = [];

    return this.store.select(leaguesSelector)
    .pipe(
      switchMap(
        (leagues: League[]) => forkJoin(
          leagues.map(l => this.getMatchesForLeague(l.id)
            .pipe(map((matches: Array<any>) => ({league: l, matches})))
          )
        )
      ),
      map(
        (competitions: Competition[]) => 
          competitions
          .reduce((competitions: Competition[], competition: Competition) => {
            if (competition.matches.length) {
              let matches = competition.matches.map(match => this.matchAdapter.adapt(match)).sort((a, b) => (a.startDate || 0)  - (b.startDate || 0))
              competitions.push({...competition, matches});
            }
            return competitions;
          }, [])
      )
    ) 
  }
}

