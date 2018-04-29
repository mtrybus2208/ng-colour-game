import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import { RootState } from './../../store';


// console.log all actions
export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return function(state: RootState, action: any): RootState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
