
export const CONTEXT_FILE:string=`import React, {
  ComponentType,
  createContext,
  useContext,
  useReducer,
} from 'react';

import { ActionTypes } from './CONTEXT_NAME.enums';
import seachReducer, { initialState } from './CONTEXT_NAME.reducer';
import { ContextType } from './CONTEXT_NAME.types';

const CONTEXT_NAME = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

export function CONTEXT_NAMEProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(seachReducer, initialState);

  

  const value: ContextType = {
    state,
    dispatch,
  };

  return (
    <CONTEXT_NAME.Provider value={value}>{children}</CONTEXT_NAME.Provider>
  );
}

export function withCONTEXT_NAME(Component: ComponentType) {
  return function LayoutHocWrapper(props: any) {
    return (
      <CONTEXT_NAMEProvider>
        <CONTEXT_NAME.Consumer>
          {() => <Component {...props} />}
        </CONTEXT_NAME.Consumer>
      </CONTEXT_NAMEProvider>
    );
  };
}

export function useCONTEXT_NAME(): ContextType {
  const context = useContext(CONTEXT_NAME);
  if (context === undefined) {
    throw new Error(
      'useCONTEXT_NAME must be used within a CONTEXT_NAMEProvider'
    );
  }
  return context;
}
`

export const ENUMS_FILE:string=`export enum ActionTypes {
  EXAMPLE = 'EXAMPLE',
}
`

export const REDUCER_FILE:string=`import { ActionTypes } from './CONTEXT_NAME.enums';
import type { ReducerActionType, StateType } from './CONTEXT_NAME.types';

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
`


export const TYPES_FILE:string=`import React from 'react';

import FetchStatusType from '@/types/FetchStatusType';

import { ActionTypes } from './CONTEXT_NAME.enums';

export type ModalType =

export interface StateType {
  example:any
}

export interface ContextType {
  state: StateType;
  dispatch: React.Dispatch<ReducerActionType>;
}

export type ReducerActionType =
  | {
      type: ActionTypes.EXAMPLE;
      payload: {
        example: StateType['example'];
      };
    }
  `


  export default {
    CONTEXT_FILE,
ENUMS_FILE,
REDUCER_FILE,
TYPES_FILE
  }