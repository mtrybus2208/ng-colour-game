import { createSelector } from '@ngrx/store';

import * as fromResults from './../reducers';

export const getFullBestResults = createSelector(fromResults.getResultsState, results => results);

export const getBestResultsArray = createSelector(fromResults.getResultsState, results => results.bestResults);

export const getResultsLoaded = createSelector(fromResults.getResultsState, results => results.loaded);

export const getResultsLoading = createSelector(fromResults.getResultsState, results => results.loading);

export const getIsTopScore = createSelector(fromResults.getResultsState, results => results.isTopScore);

