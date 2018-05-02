import { GameActionTypes, GameActions } from './../actions';

export interface ColourItem {
  colour?: string;
  name?: string;
}

export interface GameState {
  score: number;
  timer: number;
  question: ColourItem;
  shuffledColours: ColourItem[];
  base: ColourItem[];
}

const initialState: GameState = {
  score: 0,
  timer: 10,
  question: {},
  shuffledColours: [],
  base: [
    { colour: '#b36bc5', name: 'purple' },
    { colour: '#FFC107', name: 'yellow' },
    { colour: '#4CAF50', name: 'green' },
    { colour: '#03A9F4', name: 'blue' },
    { colour: '#F44336', name: 'red' },
    { colour: '#E91E63', name: 'pink' },
  ],
};
export function reducer(state: GameState = initialState, action: GameActions): GameState {
  switch (action.type) {
    case GameActionTypes.ResetResult: {
      return {
        ...state,
      };
    }
    case GameActionTypes.ShuffleColoursSuccess: {
      return {
        ...state,
        question: action.payload.question,
        shuffledColours: action.payload.shuffled,
      };
    }
    default:
      return state;
  }
}

