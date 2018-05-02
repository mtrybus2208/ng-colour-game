import { createSelector } from '@ngrx/store';

import * as fromGame from './../reducers';

export const getBaseColours = createSelector(fromGame.getGameState, game => game.base);

export const getshuffledColours = createSelector(fromGame.getGameState, game => game.shuffledColours);

export const getTimer = createSelector(fromGame.getGameState, game => game.timer);

export const getQuestion = createSelector(fromGame.getGameState, game => game.question);

export const getScore = createSelector(fromGame.getGameState, game => game.score);
