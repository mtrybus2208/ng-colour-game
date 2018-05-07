import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRootStore from './../../../../core/store';

@Component({
  selector: 'app-new-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {

  timeOptions$: Observable<number[]>;
  difficultySet$: Observable<string[]>;

  constructor(
    private gameState: Store<fromRootStore.RootState>) { }

  ngOnInit() {
    this.getGameState();
  }

  getGameState(): void {
    this.timeOptions$ = this.gameState.select(fromRootStore.getTimeOptions);
    this.difficultySet$ = this.gameState.select(fromRootStore.difficultySet);
  }

  onStartGame(payload: fromRootStore.StartGameParams) {
    this.gameState.dispatch(new fromRootStore.StartGame(payload));
  }
}

