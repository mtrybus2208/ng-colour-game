import { Action } from '@ngrx/store';

export enum ResultsActionTypes {
  GetResults = '[Results] GetResults',
  GetResultsSuccess = '[Results] GetResults Success',
  GetResultsFail = '[Results] GetResults Fail',
  CompareResults = '[Results] CompareResults',
  CompareResultsSuccess = '[Results] CompareResults Success',
  CompareResultsFail = '[Results] CompareResults Fail',
}
// Compare Actions
export class CompareResults implements Action {
  readonly type = ResultsActionTypes.CompareResults;
  constructor() {}
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

// action types
export type ResultsActions =
  | CompareResults
  | CompareResultsSuccess
  | CompareResultsFail
  | GetResults
  | GetResultsSuccess
  | GetResultsFail;
