import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { timer as globalTimer } from 'rxjs/observable/timer';
import { map, tap, takeUntil, exhaustMap, switchMap, flatMap, mergeMap } from 'rxjs/operators';

import { ColourItem } from './../../../../core/store/reducers/game.reducer';
import * as fromRootStore from './../../../../core/store';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  destroyTimer$: Subject<boolean> = new Subject<boolean>();
  questionColour$: Observable<ColourItem>;
  shuffledColours$: Observable<ColourItem>;
  gameTimer$: Observable<number>;

  constructor(
    private gameState: Store<fromRootStore.RootState>,
    private store: Store<fromRootStore.RootState>) { }

  ngOnInit() {
    this.store.dispatch(new fromRootStore.StartGame());
    this.shuffledColours$ = this.gameState.select(fromRootStore.getshuffledColours);
    this.questionColour$ = this.gameState.select(fromRootStore.getQuestion);
    this.startTimer();
  }

  startTimer() {
    this.gameTimer$ = this.gameState.select(fromRootStore.getTimer)
    .pipe(
      switchMap((global) =>
        globalTimer(0, 1000)
        .pipe(map(x => global - x))
      ),
      takeUntil(this.destroyTimer$),
      tap(x => (x < 0) ? this.stopTimer() : x ),
    );
  }

  stopTimer() {
    this.destroyTimers();
  }

  destroyTimers() {
    this.destroyTimer$.next(true);
    this.destroyTimer$.complete();
  }

  ngOnDestroy() {
    this.destroyTimers();
  }
}
