export const CONTEXT_FILE: string = `import React, {
  ComponentType,
  createContext,
  useContext,
  useReducer,
} from 'react';

import { ActionTypes } from './RCACLI.enums';
import RCACLIReducer, { initialState } from './RCACLI.reducer';
import { ContextType } from './RCACLI.types';

const RCACLI = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

export function RCACLIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(RCACLIReducer, initialState);

  

  const value: ContextType = {
    state,
    dispatch,
  };

  return (
    <RCACLI.Provider value={value}>{children}</RCACLI.Provider>
  );
}

export function withRCACLI(Component: ComponentType) {
  return function HocWrapper(props: any) {
    return (
      <RCACLIProvider>
        <RCACLI.Consumer>
          {() => <Component {...props} />}
        </RCACLI.Consumer>
      </RCACLIProvider>
    );
  };
}

export function useRCACLI(): ContextType {
  const context = useContext(RCACLI);
  if (context === undefined) {
    throw new Error(
      'useRCACLI must be used within a RCACLIProvider'
    );
  }
  return context;
}
`;

export const ENUMS_FILE: string = `export enum ActionTypes {
  EXAMPLE = 'EXAMPLE',
}
`;

export const REDUCER_FILE: string = `import { ActionTypes } from './RCACLI.enums';
import type { ReducerActionType, StateType } from './RCACLI.types';

export const initialState: StateType = {
  example:null,
};

export default function RCACLIReducer(
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
`;

export const TYPES_FILE: string = `import React from 'react';

import { ActionTypes } from './RCACLI.enums';


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
  `;

export default {
  CONTEXT_FILE,
  ENUMS_FILE,
  REDUCER_FILE,
  TYPES_FILE,
};
