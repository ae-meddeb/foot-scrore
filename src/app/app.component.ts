import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Country } from './models/types/Country';
import { League } from './models/league.model';
import { ScoreService } from './services/score.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private scoreService: ScoreService, private router: Router, private store: Store<any>) {
    let leaguesList: any[];

    this.scoreService.getLeagues()
      .subscribe((data: League[]) => {
        this.store.dispatch({type: 'LOAD', data});
      });
    
    /*this.scoreService.getLeagues()
      .pipe(
        switchMap(
          (leagues: any) => {
            leaguesList = leagues;
            return forkJoin(leagues.map((l: any) => this.scoreService.getCountry(l.country_id)))
          }
        )
      )
      .subscribe((data: any[]) => {
        const competitions = leaguesList.map((l, i) => {
          const nativeCountry = data[i];
          const c: Country = {id: nativeCountry.country_id, name: nativeCountry.name, code: nativeCountry.country_code};
          return new League(l.league_id, l.name, c);
        });
        this.store.dispatch({type: 'LOAD', data: competitions})
      })*/
  }
  
}
