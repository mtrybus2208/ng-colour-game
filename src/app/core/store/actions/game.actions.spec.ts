import * as fromGame from './game.actions';
import { GameActionTypes } from './game.actions';

describe('Game Actions', () => {

  describe('StartGame', () => {
    it('should create an action', () => {
      const payload: any = {
        time: 1,
        difficulty: 'hard',
      };
      const action = new fromGame.StartGame(payload);

      expect({ ...action }).toEqual({
        type: GameActionTypes.StartGame,
        payload: payload,
      });
    });
  });

});


