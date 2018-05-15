import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRootStore from './../../../../core/store';
import * as fromResultsStore from './../../store';

@Component({
  selector: 'app-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {

  score$: Observable<boolean>;
  difficulty$: Observable<boolean>;
  timer$: Observable<number>;
  isTopScore$: Observable<boolean>;

  constructor(
    private gameState: Store<fromRootStore.RootState>,
    private resultsState: Store<any>
  ) { }

  ngOnInit() {
    this.getGameState();
    this.compareResults();
  }

  getGameState() {
    // Crate specific selector for that
    this.score$ = this.gameState.select(fromRootStore.getScore);
    this.difficulty$ = this.gameState.select(fromRootStore.difficulty);
    this.timer$ = this.gameState.select(fromRootStore.getTimer);
    this.isTopScore$ = this.gameState.select(fromResultsStore.getIsTopScore);
  }

  compareResults() {
   this.resultsState.dispatch(new fromResultsStore.CompareResults());
  }

  onSendResult() {
    const user = {
      name: 'Jan',
      score: 5
    };
    this.resultsState.dispatch(new fromResultsStore.SendResults(user));
  }
}
