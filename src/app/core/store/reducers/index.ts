import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
} from '@ngrx/store';

import * as fromGame from './game.reducer';
import * as fromLayout from './layout.reducer';
import * as fromRouter from '@ngrx/router-store';
import * as fromRouterReducer from './router.reducer';

export * from './layout.reducer';
export * from './router.reducer';
export * from './metareducers';


export interface RootState {
  routerReducer: fromRouter.RouterReducerState<fromRouterReducer.RouterStateUrl>;
  layout: fromLayout.LayoutState;
  game: fromGame.GameState;
}

export const reducers: ActionReducerMap<RootState> = {
  routerReducer: fromRouter.routerReducer,
  layout: fromLayout.reducer,
  game: fromGame.reducer,
};

// Main selectors
export const getGameState = createFeatureSelector<any>('game');
export const getRouterState = createFeatureSelector<any>('routerReducer');
