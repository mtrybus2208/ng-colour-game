import { ResultsActionTypes, ResultsActions } from './../actions';


export interface BestResults {
  entities: Array<any>;
  loaded: boolean;
  loading: boolean;
  lastBestScoreId: string;
}
export interface UserResults {
  scoreChecked: boolean;
  isTopScore: boolean;
  loaded: boolean;
  loading: boolean;
}
export interface ResultsState {
  bestResults: BestResults;
  userResults: UserResults;
}

const initialState: ResultsState = {
  bestResults: {
    entities: null,
    loaded: false,
    loading: false,
    lastBestScoreId: null,
  },
  userResults: {
    scoreChecked: false,
    isTopScore: null,
    loaded: false,
    loading: false,
  }
};

export function reducer(state: ResultsState = initialState, action: ResultsActions): ResultsState {
  switch (action.type) {
    case ResultsActionTypes.GetResults: {
      return {
        ...state,
        userResults: {
          ...state.userResults,
          isTopScore: null
        }
      };
    }
    case ResultsActionTypes.CheckedScore: {
      return {
        ...state,
        userResults: {
          ...state.userResults,
          scoreChecked: action.payload,
        }
      };
    }
    case ResultsActionTypes.GetResultsSuccess: {
      return {
        ...state,
        bestResults: {
          ...state.bestResults,
          entities: action.payload,
          loaded: true,
          loading: false,
        }
      };
    }
    case ResultsActionTypes.GetResultsFail: {
      return {
        ...state,
        bestResults: {
          ...state.bestResults,
          loaded: false,
          loading: false,
        }
      };
    }
    case ResultsActionTypes.CompareResultsSuccess: {
      return {
        ...state,
        userResults: {
          ...state.userResults,
          isTopScore: action.payload,
        }
      };
    }
    case ResultsActionTypes.SendResults: {
      return {
        ...state,
        userResults: {
          ...state.userResults,
          loading: true,
          loaded: false,
        }
      };
    }
    case ResultsActionTypes.SendResultsFail: {
      return {
        ...state,
        userResults: {
          ...state.userResults,
          loading: false,
          loaded: false,
        }
      };
    }
    case ResultsActionTypes.SendResultsSuccess: {
      return {
        ...state,
        bestResults: {
          ...state.bestResults,
          lastBestScoreId: action.payload
        },
        userResults: {
          ...state.userResults,
          loading: false,
          loaded: true,
        }
      };
    }
    case ResultsActionTypes.ResetlastBestScore: {
      return {
        ...state,
        bestResults: {
          ...state.bestResults,
          lastBestScoreId: null
        }
      };
    }

    default:
      return state;
  }
}

