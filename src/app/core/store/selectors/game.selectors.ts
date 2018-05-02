import { createSelector } from '@ngrx/store';

import * as fromGame from './../reducers';

export const getBaseColours = createSelector(fromGame.getGameState, game => game.base);
export const getTimer = createSelector(fromGame.getGameState, game => game.timer);
