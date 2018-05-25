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
import * as ResultActions from './../../../modules/results/store/actions';

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
    exhaustMap(({payload}: any) => [
      new GameActions.ResetResult({
        time: payload.time,
        difficulty: payload.difficulty
      }),
      new GameActions.ShuffleColours(),
      new RouterActions.Go({
        path: ['/dashboard'],
      })
    ]),
    catchError(err => of(err)),
  );

  @Effect()
  shuffleColours$ = this.actions$.pipe(
    ofType(GameActionTypes.ShuffleColours),
    withLatestFrom(this.gameState$.select(fromRootSelectors.getGameSettings)),
    map(([action, settings]) => this.gs.shuffleColours(settings)),
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
        colourItems: base,
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
      new GameActions.IncreaseResult(),
      new GameActions.ShuffleColours(),
    ]),
    catchError(err => of(err)),
  );

  @Effect()
  compareColoursFail$ = this.actions$.pipe(
    ofType(GameActionTypes.CompareColoursFail),
    flatMap(payload => [
      new GameActions.DecreaseResult(),
      new GameActions.ShuffleColours(),
    ]),
    catchError(err => of(err)),
  );

  @Effect()
  showResult$ = this.actions$.pipe(
    ofType(GameActionTypes.ShowResult),
    flatMap(payload => [
      new RouterActions.Go({
        path: ['/results/current'],
      }),
      new ResultActions.CheckedScore(false),
    ]),
    catchError(err => of(err)),
  );
}
