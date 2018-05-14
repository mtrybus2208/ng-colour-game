import { createSelector } from '@ngrx/store';

import * as fromGame from './../reducers';

export const getBaseColours = createSelector(fromGame.getGameState, game => game.base);

export const getshuffledColours = createSelector(fromGame.getGameState, game => game.shuffledColours);

export const getTimer = createSelector(fromGame.getGameState, game => game.timer);

export const getQuestion = createSelector(fromGame.getGameState, game => game.question);

export const getScore = createSelector(fromGame.getGameState, game => game.score);

export const getTimeOptions = createSelector(fromGame.getGameState, game => game.timeOptions);

export const difficultySet = createSelector(fromGame.getGameState, game => game.difficultySet);

export const difficulty = createSelector(fromGame.getGameState, game => game.difficulty);

export const getGameSettings = createSelector(
  difficultySet,
  difficulty,
  getBaseColours,
  (diffSet, diff, base) => ({diffSet, diff, base})
);

export const getScoreParams = createSelector(
  getScore,
  difficulty,
  getTimer,
  (score, diff, time) => ({
    score,
    diff,
    time
  })
);
