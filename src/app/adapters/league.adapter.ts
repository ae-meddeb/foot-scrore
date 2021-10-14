import { Injectable } from "@angular/core";
import { AdapterInterface } from "./adapter.interface";
import { League } from '../models/league.model';
import { Country } from "../models/types/Country";

  
  
  @Injectable({
    providedIn: "root",
  })
  export class LeagueAdapter implements AdapterInterface<League> {

    adapt(data: any): League {
      const country: Country = {id: data.country.country_id, name: data.country.name, code: data.country.country_code};
      
      return new League(data.league_id, data.name, country);
    }
    
  }