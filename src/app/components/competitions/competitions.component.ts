import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { League } from 'src/app/models/league.model';
import { ScoreService } from '../../services/score.service';
import { Store } from '@ngrx/store';
import { leaguesSelector } from 'src/app/store/reducers/leagues.reducer';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  competitions: League[] = [];

  constructor(private scoreService: ScoreService, private router: Router, private store: Store<any>) {
    this.store.select(leaguesSelector)
      .subscribe((data: any[]) => {
        this.competitions = data;
      })
  }

  ngOnInit(): void {
    
  }

  goToLeague(id: number): void {
    this.router.navigate(['league', id]).then();
  }

}
