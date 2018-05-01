import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';

import * as routerActions from './../actions/router.actions';

@Injectable()
export class RouterEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .ofType(routerActions.GO)
    .pipe(
      map((action: routerActions.Go) => action.payload),
      tap(({ path, query: queryParams, extras }) => {
        this.router.navigate(path, { queryParams, ...extras });
      }),
    );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(routerActions.BACK)
    .pipe(
      tap(() => this.location.back()),
    );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(routerActions.FORWARD)
    .pipe(
      tap(() => this.location.forward()),
    );

}
