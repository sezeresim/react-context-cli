"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDUCER_FILE = exports.ENUMS_FILE = exports.CONTEXT_FILE = void 0;
exports.CONTEXT_FILE = `import React, { createContext, useContext, useReducer } from 'react'

import RCACLIReducer, { initialState } from './RCACLI.reducer'

const RCACLI = createContext({
    state: initialState,
    dispatch: () => {},
})

export function RCACLIProvider({ children }) {
    const [state, dispatch] = useReducer(RCACLIReducer, initialState)

    return (
        <RCACLI.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </RCACLI.Provider>
    )
}

export function withRCACLI(Component) {
    return function HocWrapper(props) {
        return (
            <RCACLIProvider>
                <RCACLI.Consumer>
                    {() => <Component {...props} />}
                </RCACLI.Consumer>
            </RCACLIProvider>
        )
    }
}

export function useRCACLI() {
    const context = useContext(RCACLI)
    if (context === undefined) {
        throw new Error(
            'useRCACLI must be used within a RCACLIProvider'
        )
    }
    return context
}
`;
exports.ENUMS_FILE = `export const ActionTypes = {
    EXAMPLE: 'EXAMPLE',
}
`;
exports.REDUCER_FILE = `import { ActionTypes } from './RCACLI.enums'

export const initialState = {
    example: null,
}

export default function RCACLIReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case ActionTypes.EXAMPLE:
            return {
                ...state,
                example: payload.example,
            }
        default:
            return state
    }
}

`;
exports.default = {
    CONTEXT_FILE: exports.CONTEXT_FILE,
    ENUMS_FILE: exports.ENUMS_FILE,
    REDUCER_FILE: exports.REDUCER_FILE,
};
