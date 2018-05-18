import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap, map, exhaustMap, catchError, flatMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ResultsState } from './../../store/reducers';
import * as fromResultsStore from './../../store';

@Component({
  selector: 'app-best-results',
  templateUrl: './best-results.component.html',
  styleUrls: ['./best-results.component.scss']
})
export class BestResultsComponent implements OnInit {

  result$: Observable<ResultsState>;
  resultArr$: Observable<Array<any>>;
  lastBestScoreId$: Observable<string>;

  constructor(private resultsState: Store<ResultsState>) { }

  ngOnInit() {
    this.getResults();
    this.getResultsState();
  }

  getResults() {
    this.resultsState.dispatch(new fromResultsStore.GetResults());
  }

  getResultsState() {
    this.result$ = this.resultsState.select(fromResultsStore.getResultsState);
    this.resultArr$ = this.resultsState.select(fromResultsStore.getResultsArray);
    this.lastBestScoreId$ = this.resultsState.select(fromResultsStore.getlastBestScoreId);
  }

}
