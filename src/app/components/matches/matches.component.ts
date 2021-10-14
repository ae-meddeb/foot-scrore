import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  @Input()
  matches:Array<Match> = []

  constructor() { }

  ngOnInit(): void {
    
  }

  trackByFn(index: number, match: Match) {
    return match.id;
  }

}
