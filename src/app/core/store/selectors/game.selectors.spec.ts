import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromReducers from './../reducers';
import * as fromGameReducer from './../reducers/game.reducer';
import * as fromActions from './../actions';
import * as fromSelectors from './../selectors/game.selectors';

describe('Game Selectors', () => {
  let store: Store<fromReducers.RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromReducers.reducers)
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getBaseColours', () => {
    it('should return array of basecolours', () => {
      const { initialState } = fromGameReducer;
      let result;
      store
        .select(fromSelectors.getBaseColours)
        .subscribe(value => {
          result = value;
        });

      expect(result).toBe(initialState.base);
    });
  });

  describe('getshuffledColours', () => {
    it('should return properly value of shuffled colours', () => {
      const shuffled = {
        question: {
          colour: '#ffffff',
          name: 'white',
        },
        colourItems: [{
          colour: '#ffffff',
          name: 'white',
        }]
      };
      let result;
      store
        .select(fromSelectors.getshuffledColours)
        .subscribe(value => {
          result = value;
        });

      expect(result).toEqual([]);

      store.dispatch(new fromActions.ShuffleColoursSuccess(shuffled));
      expect(result).toEqual(shuffled.colourItems);
    });
  });

});
