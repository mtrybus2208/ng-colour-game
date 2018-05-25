import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, take, catchError } from 'rxjs/operators';

import * as fromCoreStore from './../../../core/store';
import * as fromResultsStore from './../store';

@Injectable()
export class UserResultsGuard implements CanActivate {
  constructor(private store: Store<fromResultsStore.ResultsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<any> | boolean {
    return this.checkStore();
  }

  checkStore(): Observable<boolean> {
    return this.store
      .select(fromResultsStore.getGameStatus)
      .pipe(
        map(gameRes => {
          return gameRes.checked || gameRes.shuffled.length === 0
            ? this.redirect('/')
            : true;
        }),
        take(1)
      );
  }

  redirect(url: string): boolean {
    this.store.dispatch(new fromCoreStore.Go({ path: [url] }));
    return false;
  }
}
