import { createSelector } from '@ngrx/store';

import * as fromResults from './../reducers';
import * as fromGame from './../../../../core/store/selectors';

// User results
export const getUserResults = createSelector(fromResults.getResultsState, results => results.userResults);

export const getIsTopScore = createSelector(getUserResults, results => results.isTopScore);

export const getUserResultsLoading = createSelector(getUserResults, results => results.loading);

export const getScoreChecked = createSelector(getUserResults, results => results.scoreChecked);

export const getGameStatus = createSelector(
  fromGame.getshuffledColours,
  getScoreChecked,
  (shuffled, checked) => {
    return {
      shuffled, checked
    };
  }

);

// Best results
export const getBestResults = createSelector(fromResults.getResultsState, results => results.bestResults);

export const getBestResultsEntities = createSelector(getBestResults, results => results.entities);

export const getBestResultsLoaded = createSelector(getBestResults, results => results.loaded);

export const getlastBestScoreId = createSelector(getBestResults, results => results.lastBestScoreId);

export const getResultsArray = createSelector(getBestResultsEntities, (resObj) => {
  return Object.keys(resObj).map(level => ({
    level,
    data: Object.keys(resObj[level]).map(time => ({
      time,
      data: resObj[level][time]
    }))
  }));
});


