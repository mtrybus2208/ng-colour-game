import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError, flatMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RootState } from './../../../../core/store';
import { ResultsState } from './../../store';
import { ResultsService } from './../../services/results.service';
import * as resultsActions from './../actions';

const { ResultsActionTypes } = resultsActions;

@Injectable()
export class ResultsEffects {

  constructor(
    private actions$: Actions,
    private gameState$: Store<RootState>,
    private resultsState$: Store<ResultsState>,
    private resService: ResultsService,
  ) {}

  @Effect()
  compareResults$ = this.actions$.pipe(
    ofType(ResultsActionTypes.CompareResults),
    exhaustMap( (action) => {
      return this.resService
        .getAllResults()
        .pipe(
          map(results => new resultsActions.CompareResultsSuccess(results)),
          catchError(error => of(new resultsActions.CompareResultsFail(error)))
        );
    })
  );
}
