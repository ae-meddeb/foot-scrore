import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { NativeLeague, ServerResponse } from '../models/types/serverModels';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SportDataApiAdapter {

  private BASE_URL = 'https://app.sportdataapi.com/api/v1/soccer';
  private LEAGUES_LIST = '/leagues';
  private SEASONS_LIST = '/seasons';
  private MATCHES_LIST = '/matches';
  private COUNTRY_DETAILS = '/countries/:id';
  private LEAGUE_DETAILS = '/leagues/:id';

  private readonly favoritesLeagues: number[] = [237, 538, 392, 301, 314, 64];

  constructor(private http: HttpClient, private dateFormat: DatePipe) { }

  getLeagues(): Observable<NativeLeague[]> {
    return this._get(this.LEAGUES_LIST, {subscribed: "true"});
  }

  getPreferedLeagues(): Observable<any[]> {
    return forkJoin(this.favoritesLeagues.map(leagueId => this.getLeagueById(leagueId)));
  }

  getLeagueById(leagueId: any): Observable<[]> {
    return this._get(this.LEAGUE_DETAILS.replace(':id', leagueId), {});
  }

  getCountryById(countryId: any) {
    return this._get(this.COUNTRY_DETAILS.replace(':id', countryId), {});
  }

  getMatchesForLeague(leagueId: any) {
    const date = new Date().getTime();
    const today = this.dateFormat.transform(date, 'yyyy-MM-dd');
    const tomorrow = this.dateFormat.transform(date + 86400000, 'yyyy-MM-dd');
    return this.getCurrentSeason(leagueId)
    .pipe(
        mergeMap(season => this._get(this.MATCHES_LIST, {"season_id": season.season_id, "date_from": today, "date_to": tomorrow}))
    )
  }

  getCurrentSeason(leagueId: any) {
    return this.getLeagueSeasons(leagueId)
      .pipe(
        map(seasons => seasons.filter((season: any) => season.is_current)[0])
      );
  }

  getLeagueSeasons(leagueId: any) {
    return this._get(this.SEASONS_LIST, {"league_id": leagueId});
  }



  private _buildRequestUrl(url: string): string {
    return this.BASE_URL + url;
  }

  private _get(url: string, params?: any) {
    return this.http.get<ServerResponse>(this._buildRequestUrl(url), {
      headers: {
        apikey: "0b973250-9574-11eb-b3af-835249b9b0b1"
      }, 
      params
    })
    .pipe(
      map((res: ServerResponse) => res.data)  
    );
  }

}