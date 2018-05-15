import { ResultsActionTypes, ResultsActions } from './../actions';

export interface ResultsState {
  bestResults: Array<any>;
  loaded: boolean;
  loading: boolean;
  isTopScore: any;
}

const initialState: ResultsState = {
  bestResults: null,
  loaded: false,
  loading: false,
  isTopScore: null,
};

export function reducer(state: ResultsState = initialState, action: ResultsActions): ResultsState {
  switch (action.type) {
    case ResultsActionTypes.GetResults: {
      return {
        ...state,
        isTopScore: null
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
        isTopScore: action.payload
      };
    }

    default:
      return state;
  }
}

