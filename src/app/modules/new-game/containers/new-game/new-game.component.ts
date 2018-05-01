import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromCoreStore from './../../../../core/store';

@Component({
  selector: 'app-new-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {

  constructor(private store: Store<fromCoreStore.RootState>) { }

  ngOnInit() {
    console.log('NewGameComponent');
  }

  startGame() {
    this.store.dispatch(new fromCoreStore.StartGame());
  }
}
