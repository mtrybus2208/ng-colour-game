import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  ResizeWindow = '[Layout] Resize window',
}

export class ResizeWindow implements Action {
  readonly type = LayoutActionTypes.ResizeWindow;
  constructor(public payload: Object) {}
}

// action types
export type LayoutActions = ResizeWindow;
