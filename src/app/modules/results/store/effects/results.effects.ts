import { CompareColoursSuccess } from './../../../../core/store/actions/game.actions';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { first, merge, tap, map, exhaustMap, catchError, withLatestFrom, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RootState } from './../../../../core/store';
import { ResultsState } from './../../store';
import { ResultsService } from './../../services/results.service';
import * as RouterActions from './../../../../core/store/actions/router.actions';
import * as resultsActions from './../actions';
import * as fromGameSelectors from './../../../../core/store/selectors';
import * as fromResultsSelectors from './../../store/selectors';

const { ResultsActionTypes } = resultsActions;

@Injectable()
export class ResultsEffects {

  constructor(
    private actions$: Actions,
    private gameState: Store<RootState>,
    private resultsState: Store<ResultsState>,
    private resService: ResultsService,
  ) {}


  @Effect()
  compareResults$ = this.actions$.pipe(
    ofType(ResultsActionTypes.CompareResults),
    withLatestFrom(
      this.resultsState.select(fromResultsSelectors.getBestResultsEntities),
      this.gameState.select(fromGameSelectors.getScoreParams),
    ),
    switchMap(([payload, resultsArr, userResults]) => {
      if (resultsArr) {
        return this.resService.compareResults({payload: resultsArr, userScore: userResults})
        .pipe(
          map(result => new resultsActions.CompareResultsSuccess(result)),
        );
      }
      return of(new resultsActions.GetResults())
      .pipe(
        merge(
          this.actions$.pipe(
            ofType(ResultsActionTypes.GetResultsSuccess),
            first(),
            switchMap((res: any) => {
              return this.resService.compareResults({payload: res.payload, userScore: userResults})
              .pipe(
                map(result => new resultsActions.CompareResultsSuccess(result)),
              );
            }),
          )
        )
      );
    }),
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

  @Effect()
  sendResults$ = this.actions$
  .pipe(
    ofType(ResultsActionTypes.SendResults),
    map((action: resultsActions.SendResults) => action.payload),
    exhaustMap((resToSend) => {
      return this.resService
        .sendResults(resToSend)
        .pipe(
          map(lastBestScoreId => new resultsActions.SendResultsSuccess(lastBestScoreId)),
          catchError(error => of(new resultsActions.SendResultsFail(error)))
        );
    })
  );

  @Effect()
  sendResultsSuccess$ = this.actions$.pipe(
    ofType(ResultsActionTypes.SendResultsSuccess),
    map(() => new RouterActions.Go({
      path: ['/results/best'],
    })),
    catchError(err => of(err)),
  );

}
