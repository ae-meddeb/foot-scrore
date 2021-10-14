import { League } from "../league.model";
import { Match } from '../match.model';

export interface Competition {
    league: League;
    matches: Match[];
  }