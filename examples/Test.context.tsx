import React, {
  ComponentType,
  createContext,
  useContext,
  useReducer,
} from 'react';

import { ActionTypes } from './Test.enums';
import seachReducer, { initialState } from './Test.reducer';
import { ContextType } from './Test.types';

const Test = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

export function TestProvider({
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
    <Test.Provider value={value}>{children}</Test.Provider>
  );
}

export function withTest(Component: ComponentType) {
  return function LayoutHocWrapper(props: any) {
    return (
      <TestProvider>
        <Test.Consumer>
          {() => <Component {...props} />}
        </Test.Consumer>
      </TestProvider>
    );
  };
}

export function useTest(): ContextType {
  const context = useContext(Test);
  if (context === undefined) {
    throw new Error(
      'useTest must be used within a TestProvider'
    );
  }
  return context;
}

