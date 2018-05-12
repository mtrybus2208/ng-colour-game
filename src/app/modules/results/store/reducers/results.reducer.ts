import { ResultsActionTypes, ResultsActions } from './../actions';

export interface ResultsState {
  bestResults: any;
  comparedResults: any;
}

const initialState: ResultsState = {
  bestResults: '100',
  comparedResults: '1000',
};
export function reducer(state: ResultsState = initialState, action: ResultsActions): ResultsState {
  switch (action.type) {
    case ResultsActionTypes.CompareResultsSuccess: {
      console.log('action.payload');
      console.log(action.payload);
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}

