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
  score$: Observable<boolean>;
  gameTimer$: Observable<number>;
  difficultySet$: Observable<string[]>;
  difficulty: string;
  private ngUnsubscribe: Subject<any>;

  constructor(
    private gameState: Store<fromRootStore.RootState>,
    private store: Store<fromRootStore.RootState>) { }

  ngOnInit() {
    this.ngUnsubscribe = new Subject();
    this.getGameState();
    this.startTimer();
  }

  getGameState() {
    this.shuffledColours$ = this.gameState.select(fromRootStore.getshuffledColours);
    this.questionColour$ = this.gameState.select(fromRootStore.getQuestion);
    this.score$ = this.gameState.select(fromRootStore.getScore);
    this.difficultySet$ = this.gameState.select(fromRootStore.difficultySet);
    this.gameState.select(fromRootStore.difficulty)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((diff) => this.difficulty = diff);
  }

  onAnswer(answer: ColourItem, question: ColourItem): void {
    this.store.dispatch(
      new fromRootStore.CompareColours({answer, question})
    );
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
    this.store.dispatch(
      new fromRootStore.ShowResult()
    );
  }

  destroyTimers() {
    this.destroyTimer$.next(true);
    this.destroyTimer$.complete();
  }

  onFinishGame() {
    this.store.dispatch(
      new fromRootStore.ShowResult()
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.destroyTimers();
  }
}
