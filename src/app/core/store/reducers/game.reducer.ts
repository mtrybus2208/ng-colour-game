import { GameActionTypes, GameActions } from './../actions';

export interface ColourItem {
  colour?: string;
  name?: string;
}

export interface GameState {
  score: number;
  timeOptions: number[];
  timer: number;
  difficultySet: string[];
  difficulty: string;
  question: ColourItem;
  shuffledColours: ColourItem[];
  base: ColourItem[];
  finished: boolean;
}

export const initialState: GameState = {
  finished: true,
  score: 0,
  timeOptions: [30, 60, 90],
  timer: 60,
  difficultySet: ['easy', 'medium', 'hard'],
  difficulty: 'hard',
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

    case GameActionTypes.FinishGame: {
      return {
        ...state,
        finished: true,
      };
    }

    case GameActionTypes.ShuffleColours: {
      return {
        ...state,
        finished: false,
      };
    }
    case GameActionTypes.ShuffleColoursSuccess: {
      return {
        ...state,
        question: action.payload.question,
        shuffledColours: action.payload.colourItems,
      };
    }

    case GameActionTypes.ResetResult: {
      return {
        ...state,
        score: 0,
        timer: action.payload.time,
        difficulty: action.payload.difficulty,
      };
    }

    case GameActionTypes.IncreaseResult: {
      return {
        ...state,
        // score: state.score + 1,
        score: state.score + 5,
      };
    }

    case GameActionTypes.DecreaseResult: {
      return {
        ...state,
        score: state.score === 0 ? state.score : state.score - 5,
      };
    }

    default:
      return state;
  }
}

