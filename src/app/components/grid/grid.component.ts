import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Competition } from 'src/app/models/types/competition';
import { League } from 'src/app/models/league.model';
import { Match } from 'src/app/models/match.model';
import { ScoreService } from 'src/app/services/score.service';
import { leaguesSelector } from 'src/app/store/reducers/leagues.reducer';
import { MatchAdapter } from '../../adapters/match.adapter';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  grid: Competition[] = []
  leagues: League[] = []

  constructor(private route: ActivatedRoute, private scoreService: ScoreService, private store: Store<any>) { }

  ngOnInit(): void {
    const leagueId = this.route.snapshot.paramMap.get("id");
    if (leagueId) {
      this.scoreService.getMatchesForLeague(leagueId)
      .subscribe((data:any) => {
        console.log(data)
        //this.matches = data;
      })
    } else { // get all leagues
      this.scoreService.getAllMatches()
      .subscribe((matchesGrid: any) => this.grid = matchesGrid);
    }
  }

  trackByFn(index: number) {
    return index;
  }

}
