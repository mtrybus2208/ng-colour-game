import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError, flatMap, withLatestFrom, switchMap, combineLatest, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RootState } from './../../../../core/store';
import { ResultsState } from './../../store';
import { ResultsService } from './../../services/results.service';
import * as resultsActions from './../actions';
import * as fromGameSelectors from './../../../../core/store/selectors';
import * as fromResultsSelectors from './../../store/selectors';

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
    exhaustMap(() => {
      return of(new resultsActions.GetResults())
      .pipe(
        map((res, lol) => {
          return this.resService.compareResults({res, lol});
        })
      );
    }),
 
    tap(x => console.log(x)),
    map(x => new resultsActions.CompareResultsSuccess())
  );

  @Effect()
  getResults$ = this.actions$.pipe(
    ofType(ResultsActionTypes.GetResults),
    exhaustMap((action) => {
      return this.resService
        .getAllResults()
        .pipe(
          map(results => new resultsActions.GetResultsSuccess(results)),
          catchError(error => of(new resultsActions.GetResultsFail(error)))
        );
    })
  );
}
