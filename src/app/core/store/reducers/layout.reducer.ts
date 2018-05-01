import { LayoutActions, LayoutActionTypes } from './../actions';

export interface LayoutState {
  openedModal: boolean;
  windowHeight: number;
  windowWidth: number;
}

const initialState: LayoutState = {
  openedModal: false,
  windowHeight: 1000,
  windowWidth: 1000,
};

export function reducer(state: LayoutState = initialState, action: LayoutActions): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.ResizeWindow: {
      const height: number = action.payload['height'];
      const width: number = action.payload['width'];
      return {
        ...state,
        windowHeight: height,
        windowWidth: width,
      };
    }
    default:
      return state;
  }
}

