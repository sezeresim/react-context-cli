export const CONTEXT_FILE: string = `import React, { createContext, useContext, useReducer } from 'react'

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

export const ENUMS_FILE: string = `export const ActionTypes = {
    EXAMPLE: 'EXAMPLE',
}
`;

export const REDUCER_FILE: string = `import { ActionTypes } from './RCACLI.enums'

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

export default {
  CONTEXT_FILE,
  ENUMS_FILE,
  REDUCER_FILE,
};
