import React, {
  ComponentType,
  createContext,
  useContext,
  useReducer,
} from 'react';

import { ActionTypes } from './test.enums';
import seachReducer, { initialState } from './test.reducer';
import { ContextType } from './test.types';

const test = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

export function testProvider({
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
    <test.Provider value={value}>{children}</test.Provider>
  );
}

export function withtest(Component: ComponentType) {
  return function LayoutHocWrapper(props: any) {
    return (
      <testProvider>
        <test.Consumer>
          {() => <Component {...props} />}
        </test.Consumer>
      </testProvider>
    );
  };
}

export function usetest(): ContextType {
  const context = useContext(test);
  if (context === undefined) {
    throw new Error(
      'usetest must be used within a testProvider'
    );
  }
  return context;
}

