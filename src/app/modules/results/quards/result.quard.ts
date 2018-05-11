import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, take, catchError } from 'rxjs/operators';

import * as fromCoreStore from './../../../core/store';

@Injectable()
export class ResultsGuard implements CanActivate {

  constructor(private store: Store<fromCoreStore.RootState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<any> | boolean {
    return this.checkStore();
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromCoreStore.getshuffledColours)
      .pipe(
        map(shuffled => shuffled.length),
        map(shLength => shLength === 0 ? (this.redirect('/new-game')) : true),
        take(1),
      );
  }

  redirect(url: string): boolean {
    this.store.dispatch( new fromCoreStore.Go({ path: [url] }));
    return false;
  }

}
