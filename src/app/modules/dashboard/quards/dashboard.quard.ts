import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, take, catchError } from 'rxjs/operators';

import * as fromCoreStore from './../../../core/store';

@Injectable()
export class DashboarddGuard implements CanActivate {

  constructor(private store: Store<fromCoreStore.RootState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<any> | boolean {
    return this.store.select(fromCoreStore.getshuffledColours)
    .pipe(
      map(shuffled => {
        if (shuffled.length > 0) {
          return true;
        } else {
          this.store.dispatch( new fromCoreStore.Go({ path: ['/dashboard'] });
          return false;
        }
      }),
      take(1),
    );
  }

}

