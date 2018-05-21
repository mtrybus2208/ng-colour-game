import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap, map, exhaustMap, catchError, flatMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ResultsState } from './../../store/reducers';
import { RootState } from './../../../../core/store';
import * as fromResultsStore from './../../store';
import * as fromRootStore from './../../../../core/store';

@Component({
  selector: 'app-best-results',
  templateUrl: './best-results.component.html',
  styleUrls: ['./best-results.component.scss']
})
export class BestResultsComponent implements OnInit, OnDestroy {

  bestResultsLoaded$: Observable<boolean>;
  resultArr$: Observable<Array<any>>;
  lastBestScoreId$: Observable<string>;
  difficulty$: Observable<string>;
  timer$: Observable<number>;

  constructor(
    private resultsState: Store<ResultsState>,
    private rootState: Store<RootState>,
  ) { }

  ngOnInit() {
    this.getResults();
    this.getGameState();
    this.getResultsState();
  }

  getResults() {
    this.resultsState.dispatch(new fromResultsStore.GetResults());
  }

  getResultsState() {
    this.bestResultsLoaded$ = this.resultsState.select(fromResultsStore.getBestResultsLoaded);
    this.resultArr$ = this.resultsState.select(fromResultsStore.getResultsArray);
    this.lastBestScoreId$ = this.resultsState.select(fromResultsStore.getlastBestScoreId);
  }
  getGameState() {
    this.difficulty$ = this.rootState.select(fromRootStore.difficulty);
    this.timer$ = this.rootState.select(fromRootStore.getTimer);
  }

  ngOnDestroy() {
    this.resultsState.dispatch(new fromResultsStore.ResetlastBestScore());
  }

}
