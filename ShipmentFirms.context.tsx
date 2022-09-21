import React, {
  ComponentType,
  createContext,
  useContext,
  useReducer,
} from "react";

import { ActionTypes } from "./ShipmentFirms.enums";
import seachReducer, { initialState } from "./ShipmentFirms.reducer";
import { ContextType } from "./ShipmentFirms.types";

const ShipmentFirms = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

export function ShipmentFirmsProvider({
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
    <ShipmentFirms.Provider value={value}>{children}</ShipmentFirms.Provider>
  );
}

export function withShipmentFirms(Component: ComponentType) {
  return function LayoutHocWrapper(props: any) {
    return (
      <ShipmentFirmsProvider>
        <ShipmentFirms.Consumer>
          {() => <Component {...props} />}
        </ShipmentFirms.Consumer>
      </ShipmentFirmsProvider>
    );
  };
}

export function useShipmentFirms(): ContextType {
  const context = useContext(ShipmentFirms);
  if (context === undefined) {
    throw new Error(
      "useShipmentFirms must be used within a ShipmentFirmsProvider"
    );
  }
  return context;
}
