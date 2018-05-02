import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from './../../../../environments/environment';

import { RootState } from './../../store';


// console.log all actions
export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return function(state: RootState, action: any): RootState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
/**
 * Array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<RootState>[] = !environment.production
? [storeFreeze]
: [];
