import * as fromGame from './game.actions';

describe('Game Actions', () => {

  describe('StartGame', () => {
    it('should create an action', () => {
      const payload: any = {
        time: 30,
        difficulty: 'medium',
      };
      const action = new fromGame.StartGame(payload);

      expect({ ...action }).toEqual({
          type: fromGame.GameActionTypes.StartGame,
          payload,
      });
    });
  });

  describe('ShuffleColours', () => {
    it('should create an action', () => {
      const action = new fromGame.ShuffleColours();

      expect({ ...action }).toEqual({
          type: fromGame.GameActionTypes.ShuffleColours,
      });
    });
  });

  describe('ShuffleColoursSuccess', () => {
    it('should create an action', () => {
      const payload = {
        question: {
          colour: '#ffffff',
          name: 'white',
        },
        colourItems: [{
          colour: '#ffffff',
          name: 'white',
        }]
      };
      const action = new fromGame.ShuffleColoursSuccess(payload);

      expect({ ...action }).toEqual({
          type: fromGame.GameActionTypes.ShuffleColoursSuccess,
          payload
      });
    });
  });

  describe('CompareColours', () => {
    it('should create an action', () => {
      const colourItem = {
        colour: '#ffffff',
        name: 'white',
      };
      const payload = {
        answer: colourItem,
        question: colourItem
      };
      const action = new fromGame.CompareColours(payload);

      expect({ ...action }).toEqual({
          type: fromGame.GameActionTypes.CompareColours,
          payload
      });
    });
  });

  describe('CompareColoursSuccess', () => {
    it('should create an action', () => {
      const action = new fromGame.CompareColoursSuccess();

      expect({ ...action }).toEqual({
          type: fromGame.GameActionTypes.CompareColoursSuccess,
      });
    });
  });

  describe('CompareColoursFail', () => {
    it('should create an action', () => {
      const action = new fromGame.CompareColoursFail();

      expect({ ...action }).toEqual({
          type: fromGame.GameActionTypes.CompareColoursFail,
      });
    });
  });

  describe('IncreaseResult', () => {
    it('should create an action', () => {
      const action = new fromGame.IncreaseResult();

      expect({ ...action }).toEqual({
          type: fromGame.GameActionTypes.IncreaseResult,
      });
    });
  });

  describe('DecreaseResult', () => {
    it('should create an action', () => {
      const action = new fromGame.DecreaseResult();

      expect({ ...action }).toEqual({
          type: fromGame.GameActionTypes.DecreaseResult,
      });
    });
  });

  describe('ShowResult', () => {
    it('should create an action', () => {
      const payload = 1;
      const action = new fromGame.ShowResult(payload);

      expect({ ...action }).toEqual({
          type: fromGame.GameActionTypes.ShowResult,
          payload,
      });
    });
  });

});
