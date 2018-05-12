import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
} from '@ngrx/store';

import * as fromResultsReducer from './results.reducer';

export * from './results.reducer';


export interface ResultsState {
  results: fromResultsReducer.ResultsState;
}

export const reducers: ActionReducerMap<ResultsState> = {
  results: fromResultsReducer.reducer,
};

// Main selectors
export const getResultsState = createFeatureSelector<any>('results');
