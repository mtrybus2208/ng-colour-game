import { Action } from '@ngrx/store';

export enum ResultsActionTypes {
  CompareResults = '[Results] CompareResults',
  CompareResultsSuccess = '[Results] CompareResults Success',
  CompareResultsFail = '[Results] CompareResults Fail',
}

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


// action types
export type ResultsActions =
  | CompareResults
  | CompareResultsSuccess
  | CompareResultsFail;
