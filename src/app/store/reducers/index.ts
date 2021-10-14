import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { League } from 'src/app/models/league.model';
import { environment } from '../../../environments/environment';
import { leagueReducer } from './leagues.reducer';


export interface State {
  leagues: Array<League>
}

export interface ActionInterface {
  type: string;
  data: any;
}

export const reducers:any = {
  leagueReducer  
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


