import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError, flatMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { GameService } from './../../services/game.service';
import { RootState } from './../reducers/';
import * as fromRootSelectors from './../selectors';

import * as RouterActions from './../actions/router.actions';
import * as GameActions from './../actions/game.actions';

const { GameActionTypes } = GameActions;

@Injectable()
export class GameEffects {

  constructor(
    private actions$: Actions,
    private gs: GameService,
    private gameState$: Store<RootState>) {}

  @Effect()
  startGame$ = this.actions$.pipe(
    ofType(GameActionTypes.StartGame),
    exhaustMap(payload => [
      new GameActions.ShuffleColours(),
      new GameActions.ResetResult(),
      new RouterActions.Go({
        path: ['/dashboard'],
      })
    ]),
    catchError(err => of(err)),
  );

  @Effect()
  shuffleColours$ = this.actions$.pipe(
    ofType(GameActionTypes.ShuffleColours),
    withLatestFrom(this.gameState$.select(fromRootSelectors.getBaseColours)),
    map(([action, base]) => this.gs.shuffleColours(base)),
    map((shuffled) => new GameActions.ShuffleColoursSuccess(shuffled)),
    catchError(err => of(err)),
  );

  @Effect()
  compareColours$ = this.actions$.pipe(
    ofType(GameActionTypes.CompareColours),
    withLatestFrom(this.gameState$.select(fromRootSelectors.getBaseColours)),
    map(([{payload}, base]: any) => {
      const compareSet = {
        question: payload.question,
        answer: payload.answer,
        base,
      };
      const result = this.gs.compareColours(compareSet);
      return (result === true)
        ? new GameActions.CompareColoursSuccess()
        : new GameActions.CompareColoursFail();
    }),
    catchError(err => of(err)),
  );

  @Effect()
  compareColoursSuccess$ = this.actions$.pipe(
    ofType(GameActionTypes.CompareColoursSuccess),
    flatMap(payload => [
      new GameActions.ShuffleColours(),
      new GameActions.UpdateResult(),
    ]),
    catchError(err => of(err)),
  );

  @Effect()
  compareColoursFail$ = this.actions$.pipe(
    ofType(GameActionTypes.CompareColoursFail),
    flatMap(payload => [
      new GameActions.ShuffleColours(),
    ]),
    catchError(err => of(err)),
  );

  @Effect()
  showResult$ = this.actions$.pipe(
    ofType(GameActionTypes.ShowResult),
    map(() => new RouterActions.Go({
      path: ['/results'],
    })),
    catchError(err => of(err)),
  );
}
