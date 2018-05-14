import { ResultsActionTypes, ResultsActions } from './../actions';

export interface ResultsState {
  bestResults: Array<any>;
  comparedResults: any;
  loaded: boolean;
  loading: boolean;
}

const initialState: ResultsState = {
  bestResults: null,
  comparedResults: '1000',
  loaded: false,
  loading: false,
};
export function reducer(state: ResultsState = initialState, action: ResultsActions): ResultsState {
  switch (action.type) {
    case ResultsActionTypes.GetResults: {
      return {
        ...state,
        loading: true,
      };
    }
    case ResultsActionTypes.GetResultsSuccess: {
      return {
        ...state,
        loaded: true,
        loading: false,
        bestResults: action.payload
      };
    }
    case ResultsActionTypes.GetResultsFail: {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }
    case ResultsActionTypes.CompareResultsSuccess: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}

