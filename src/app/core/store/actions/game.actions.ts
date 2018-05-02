import { Action } from '@ngrx/store';

import { ColourItem  } from './../reducers/game.reducer';

export enum GameActionTypes {
  StartGame = '[Game] StartGame',
  ChangeQuote = '[Game] Change Quote',
  SubmitQuotesForm = '[Game] Submit Quotes Form',
  ShuffleColours = '[Game] Shuffle Colours',
  ShuffleColoursSuccess = '[Game] Shuffle Colours Success',
  CompareColours = '[Game] Compare Colours',
  CompareColoursSuccess = '[Game] Compare Success',
  CcompareColoursFail = '[Game] Compare Fail',
  UpdateResult = '[Game] Update Result',
  ResetResult = '[Game] Reset Result',
}

export class StartGame implements Action {
  readonly type = GameActionTypes.StartGame;
  constructor(public payload?: Object) {}
}
export class ResetResult implements Action {
  readonly type = GameActionTypes.ResetResult;
  constructor(public payload?: Object) {}
}

export class ShuffleColours implements Action {
  readonly type = GameActionTypes.ShuffleColours;
  constructor(public payload?: Object) {}
}
export class ShuffleColoursSuccess implements Action {
  readonly type = GameActionTypes.ShuffleColoursSuccess;
  constructor(public payload: {question: ColourItem, shuffled: ColourItem[]}) {}
}

// action types
export type GameActions =
  | StartGame
  | ResetResult
  | ShuffleColours
  | ShuffleColoursSuccess;
