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
  CompareColoursFail = '[Game] Compare Fail',
  UpdateResult = '[Game] Update Result',
  ResetResult = '[Game] Reset Result',
  ShowResult = '[Game] ShowResult',
}

export interface StartGameParams {
  time: number;
  difficulty: string;
}
export class StartGame implements Action {
  readonly type = GameActionTypes.StartGame;
  constructor(public payload: StartGameParams) {}
}
export class ResetResult implements Action {
  readonly type = GameActionTypes.ResetResult;
  constructor(public payload?: StartGameParams) {}
}

export class ShuffleColours implements Action {
  readonly type = GameActionTypes.ShuffleColours;
  constructor(public payload?: Object<any>) {}
}
export class ShuffleColoursSuccess implements Action {
  readonly type = GameActionTypes.ShuffleColoursSuccess;
  constructor(public payload: {question: ColourItem, shuffled: ColourItem[]}) {}
}

export class CompareColours implements Action {
  readonly type = GameActionTypes.CompareColours;
  constructor(public payload: {answer: ColourItem, question: ColourItem}) {}
}

export class CompareColoursSuccess implements Action {
  readonly type = GameActionTypes.CompareColoursSuccess;
  constructor(public payload?: any) {}
}

export class CompareColoursFail implements Action {
  readonly type = GameActionTypes.CompareColoursFail;
  constructor(public payload?: any) {}
}

export class UpdateResult implements Action {
  readonly type = GameActionTypes.UpdateResult;
  constructor(public payload?: any) {}
}

export class ShowResult implements Action {
  readonly type = GameActionTypes.ShowResult;
  constructor(public payload?: number) {}
}

// action types
export type GameActions =
  | StartGame
  | ResetResult
  | ShuffleColours
  | ShuffleColoursSuccess
  | CompareColours
  | CompareColoursSuccess
  | CompareColoursFail
  | UpdateResult
  | ShowResult;
