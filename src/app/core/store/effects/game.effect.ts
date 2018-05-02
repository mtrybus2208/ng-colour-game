import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError, flatMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { GameService } from './../../services/game.service';
import * as fromRootStore from './../../store';

import {
  ResetResult,
  GameActionTypes,
  ShuffleColours,
  ShuffleColoursSuccess,
} from './../actions/game.actions';
import * as RouterActions from './../actions/router.actions';

@Injectable()
export class GameEffects {

  constructor(
    private actions$: Actions,
    private gs: GameService,
    private gameState$: Store<fromRootStore.RootState>) {}

  @Effect()
  startGame$ = this.actions$.pipe(
    ofType(GameActionTypes.StartGame),
    flatMap(payload => [
      new ShuffleColours(),
      new ResetResult(),
    ]),
    // map(() => new ResetResult()),
    catchError(err => of(err)),
  );

  @Effect()
  resetResult$ = this.actions$.pipe(
    ofType(GameActionTypes.ResetResult),
    map(() => new RouterActions.Go({
      path: ['/dashboard'],
    })),
    catchError(err => of(err)),
  );

  @Effect()
  shuffleColours$ = this.actions$.pipe(
    ofType(GameActionTypes.ShuffleColours),
    withLatestFrom(this.gameState$.select(fromRootStore.getBaseColours)),
    map(([action, base]) => this.gs.shuffleColours(base)),
    map((shuffled) => new ShuffleColoursSuccess(shuffled)),
    catchError(err => of(err)),
  );
}
