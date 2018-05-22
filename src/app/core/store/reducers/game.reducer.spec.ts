import * as fromGame from './game.reducer';
import * as fromActions from './../actions/game.actions';

describe('GameReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromGame;
      const action = {} as any;
      const state = fromGame.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('ShuffleColoursSuccess action', () => {

    let payload;

    beforeEach(() => {
      payload = {
        question: {
          colour: '#ffffff',
          name: 'white',
        },
        colourItems: [{
          colour: '#ffffff',
          name: 'white',
        }]
      };
    });

    it('should add properly question to state', () => {
      const { initialState } = fromGame;
      const action = new fromActions.ShuffleColoursSuccess(payload);
      const state = fromGame.reducer(initialState, action);

      expect(state.question).toEqual(payload.question);
    });

    it('should add properly shuffledColours to state', () => {
      const { initialState } = fromGame;
      const action = new fromActions.ShuffleColoursSuccess(payload);
      const state = fromGame.reducer(initialState, action);

      expect(state.shuffledColours).toEqual(payload.colourItems);
    });
  });

  describe('ResetResult action', () => {

    let payload;

    beforeEach(() => {
      payload = {
        time: 30,
        difficulty: 'medium',
      };
    });

    it('should set score to 0', () => {
      const { initialState } = fromGame;
      const action = new fromActions.ResetResult(payload);
      const state = fromGame.reducer(initialState, action);

      expect(state.score).toBe(0);
    });

    it('should add timer and difficulty from payload to state', () => {
      const { initialState } = fromGame;
      const action = new fromActions.ResetResult(payload);
      const state = fromGame.reducer(initialState, action);

      expect(state.timer).toBe(payload.time);
      expect(state.difficulty).toBe(payload.difficulty);
    });
  });

  describe('IncreaseResult action', () => {

    it('should increase score by selected number', () => {
      const { initialState } = fromGame;
      const action = new fromActions.IncreaseResult();
      const state = fromGame.reducer(initialState, action);

      expect(state.score).toBeGreaterThan(0);
    });
  });

  describe('DecreaseResult action', () => {

    it('should return 0 when state score is 0', () => {
      const { initialState } = fromGame;
      const action = new fromActions.DecreaseResult();
      const state = fromGame.reducer(initialState, action);

      expect(state.score).toBe(0);
    });

    it('should decrease score by selected number', () => {
      const initialScore = 10;
      const { initialState } = fromGame;
      initialState.score = initialScore;
      const action = new fromActions.DecreaseResult();
      const state = fromGame.reducer(initialState, action);

      expect(state.score).toBeLessThan(initialScore);
    });
  });

});
