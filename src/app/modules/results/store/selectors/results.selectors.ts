import { createSelector } from '@ngrx/store';

import * as fromResults from './../reducers';

export const getFullBestResults = createSelector(fromResults.getResultsState, results => results);

export const getBestResultsArray = createSelector(fromResults.getResultsState, results => results.bestResults);

export const getResultsLoaded = createSelector(fromResults.getResultsState, results => results.loaded);

export const getResultsLoading = createSelector(fromResults.getResultsState, results => results.loading);

export const getIsTopScore = createSelector(fromResults.getResultsState, results => results.isTopScore);

export const getBestResults = createSelector(fromResults.getResultsState, results => results.bestResults);

export const getResultsArray = createSelector(getBestResults, (resObj) => {
  return Object.keys(resObj).map(level => ({
    level,
    data: Object.keys(resObj[level]).map(time => ({
      time,
      data: resObj[level][time]
    }))
  }));
});


