import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import {
  ResetResult,
  GameActionTypes,
} from './../actions/game.actions';
import * as RouterActions from './../actions/router.actions';

@Injectable()
export class GameEffects {

  constructor(private actions$: Actions) {}

  @Effect()
  startGame$ = this.actions$.pipe(
    ofType(GameActionTypes.StartGame),
    map(() => new ResetResult()),
    catchError(err => of(err)),
  );

  @Effect()
  resetResult$ = this.actions$.pipe(
    ofType(GameActionTypes.ResetResult),
    map(() => new RouterActions.Go({
      path: ['/results'],
    })),
    catchError(err => of(err)),
  );
}
 