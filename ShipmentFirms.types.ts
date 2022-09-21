import React from "react";

import FetchStatusType from "@/types/FetchStatusType";

import { ActionTypes } from "./ShipmentFirms.enums";

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
        example: StateType["example"];
      };
    }
  