import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRootStore from './../../../../core/store';

@Component({
  selector: 'app-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {

  score$: Observable<boolean>;

  constructor(private gameState: Store<fromRootStore.RootState>) { }

  ngOnInit() {
    this.score$ = this.gameState.select(fromRootStore.getScore);
  }
}
