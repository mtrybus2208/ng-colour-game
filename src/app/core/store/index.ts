import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from './../../../environments/environment';

import * as fromLayout from './reducers/layout.reducer';
import { logger } from './reducers/metareducers';

export interface RootState {
  // routerReducer: fromRouter.RouterReducerState<fromRouterReducer.RouterStateUrl>;
  layout: fromLayout.LayoutState;
}

export const reducers: ActionReducerMap<RootState> = {
  // routerReducer: fromRouter.routerReducer,
  layout: fromLayout.reducer,
};

/**
 * Array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<RootState>[] = !environment.production
? [logger, storeFreeze]
: [];

