import { Injectable } from "@angular/core";
import { Match } from "../models/match.model";
import { Team } from "../models/team.model";
import { AdapterInterface } from "./adapter.interface";

  
  
  @Injectable({
    providedIn: "root",
  })
  export class MatchAdapter implements AdapterInterface<Match> {

    adapt(data: any): Match {
        const homeTeamData = data.home_team || {};
        const awayTeamData = data.away_team || {};
        const homeTeam = new Team(homeTeamData.team_id, homeTeamData.name, homeTeamData.short_code, homeTeamData.logo);
        const awayTeam = new Team(awayTeamData.team_id, awayTeamData.name, awayTeamData.short_code, awayTeamData.logo);
        const date = data.match_start_iso && new Date(data.match_start_iso).getTime() || null;
        
        return new Match(data.match_id, data.status_code, homeTeam, awayTeam, data.stats?.home_score, data.stats?.away_score, data.venue?.name, date, data.status, data.minute);
    }
    
  }