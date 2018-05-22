import { Action } from '@ngrx/store';

import { ColourItem } from './../reducers/game.reducer';
import { GameParams } from './../../services/game.service';

export enum GameActionTypes {
  StartGame = '[Game] StartGame',
  ShuffleColours = '[Game] Shuffle Colours',
  ShuffleColoursSuccess = '[Game] Shuffle Colours Success',
  CompareColours = '[Game] Compare Colours',
  CompareColoursSuccess = '[Game] Compare Success',
  CompareColoursFail = '[Game] Compare Fail',
  UpdateResult = '[Game] Update Result',
  IncreaseResult = '[Game] Increase Result',
  DecreaseResult = '[Game] Decrease Result',
  ResetResult = '[Game] Reset Result',
  ShowResult = '[Game] ShowResult',
}

export interface StartGameParams {
  time: number;
  difficulty?: string;
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
  constructor() {}
}
export class ShuffleColoursSuccess implements Action {
  readonly type = GameActionTypes.ShuffleColoursSuccess;
  constructor(public payload: GameParams) {}
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

export class IncreaseResult implements Action {
  readonly type = GameActionTypes.IncreaseResult;
  constructor() {}
}

export class DecreaseResult implements Action {
  readonly type = GameActionTypes.DecreaseResult;
  constructor() {}
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
  | IncreaseResult
  | DecreaseResult
  | ShowResult;
