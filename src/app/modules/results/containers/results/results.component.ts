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

  constructor(
    private gameState: Store<fromRootStore.RootState>,
    private resultsState: Store<any>
  ) { }

  ngOnInit() {
    this.getGameState();
    this.compareResults();
  }

  getGameState() {
    this.score$ = this.gameState.select(fromRootStore.getScore);
    this.difficulty$ = this.gameState.select(fromRootStore.difficulty);
  }

  compareResults() {
   this.resultsState.dispatch(new fromResultsStore.CompareResults());
  }
}
