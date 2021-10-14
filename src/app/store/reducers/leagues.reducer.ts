import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { League } from 'src/app/models/league.model';
import { ActionInterface, State } from '.';

const initialState: State = {
    leagues: []
};

interface LoadAction {
  type: string;
  data: Array<League>;
}
 
export function leagueReducer(state = initialState, action: LoadAction) {
  if (action.type === "LOAD") {
    return {
      leagues: action.data
    };
  }
  return state;
}

const leagueFS = createFeatureSelector<State>('leagueReducer');
export const leaguesSelector = createSelector(leagueFS, state => state.leagues);