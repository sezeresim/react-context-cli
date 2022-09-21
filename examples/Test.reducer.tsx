import { ActionTypes } from './Test.enums';
import type { ReducerActionType, StateType } from './Test.types';

export const initialState: StateType = {
  example:any,
};

export default function seachReducer(
  state: StateType,
  action: ReducerActionType
): StateType {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.EXAMPLE:
      return {
        ...state,
        example: payload.example,
      };
    default:
      return state;
  }
}

