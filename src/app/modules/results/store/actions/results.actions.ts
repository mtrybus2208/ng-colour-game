import { Action } from '@ngrx/store';

import { ResultToSend } from './../../models/results.model';

export enum ResultsActionTypes {
  GetResults = '[Results] GetResults',
  GetResultsSuccess = '[Results] GetResults Success',
  GetResultsFail = '[Results] GetResults Fail',
  CompareResults = '[Results] CompareResults',
  CompareResultsSuccess = '[Results] CompareResults Success',
  CompareResultsFail = '[Results] CompareResults Fail',
  SendResults = '[Results] SendResults',
  SendResultsSuccess = '[Results] SendResults Success',
  SendResultsFail = '[Results] SendResults Fail',
}
// Compare Actions
export class CompareResults implements Action {
  readonly type = ResultsActionTypes.CompareResults;
  constructor(public payload?: any) {}
}
export class CompareResultsSuccess implements Action {
  readonly type = ResultsActionTypes.CompareResultsSuccess;
  constructor(public payload?: any) {}
}
export class CompareResultsFail implements Action {
  readonly type = ResultsActionTypes.CompareResultsFail;
  constructor(public payload?: any) {}
}

// Get Actions
export class GetResults implements Action {
  readonly type = ResultsActionTypes.GetResults;
  constructor() {}
}
export class GetResultsSuccess implements Action {
  readonly type = ResultsActionTypes.GetResultsSuccess;
  constructor(public payload?: any) {}
}
export class GetResultsFail implements Action {
  readonly type = ResultsActionTypes.GetResultsFail;
  constructor(public payload?: any) {}
}

// Send Actions
export class SendResults implements Action {
  readonly type = ResultsActionTypes.SendResults;
  constructor(public payload: ResultToSend) {}
}
export class SendResultsSuccess implements Action {
  readonly type = ResultsActionTypes.SendResultsSuccess;
  constructor(public payload?: any) {}
}
export class SendResultsFail implements Action {
  readonly type = ResultsActionTypes.SendResultsFail;
  constructor(public payload?: any) {}
}

// action types
export type ResultsActions =
  | CompareResults
  | CompareResultsSuccess
  | CompareResultsFail
  | GetResults
  | GetResultsSuccess
  | GetResultsFail
  | SendResults
  | SendResultsSuccess
  | SendResultsFail;
