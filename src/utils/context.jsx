import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

export const ActionType =  {
    AuthType: 'setAuthType',
    AuthStatus: 'setAuthStatus', 
    AuthToken: 'setAuthToken',
    AuthData: 'setAuthData',
 }

/**
 * {
 *      setAuthType: (state, payload) => return,
 * }
 */

const reducer = new Map([
    [ActionType.AuthType, (state, payload) => {
        return ({...state, authType: payload})

    }], 
    [ActionType.AuthStatus, (state, payload) => {
        return ({...state, authStatus: payload})
        
    }],
    [ActionType.AuthToken, (state, payload) => {
        return ({...state, authToken: payload})
        
    }],
    [ActionType.AuthData, (state, payload) => {
        return ({...state, authData: payload})
        
    }],
])

const stateReducer = (state, {type, payload}) => {
    const map = reducer.get(type)
    return map ? map(state, payload) : state;
}

const ParentContext = createContext(null)
export const useParentContext = () => {
    return useContext(ParentContext)
} 

export const ParentProvider = (props) => {
    const ReducerBag = useReducer(stateReducer, {
        authType: undefined,
        authStatus: false,
        authToken: undefined,
        authData: undefined,
    })
    const [state, dispatch] = ReducerBag

    // handle auth
    useEffect(() => {
        const local = localStorage.getItem('auth')
       
        if(local) {
            if (state.authType === 'google') {
                dispatch({type: ActionType.AuthStatus, payload: true})
            } else {
                const user = JSON.parse(local)
                const urlAuth = `https://notflixtv.herokuapp.com/api/v1/users/${user.id}`
                axios.get(urlAuth).then((res) => {
                    dispatch({type: ActionType.AuthStatus, payload: true})
                    dispatch({type: ActionType.AuthData, payload: res.data})
                    dispatch({type: ActionType.AuthToken, payload: res.data.data.token})
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }, [state, dispatch])

    return <ParentContext.Provider value={ReducerBag}>{props.children}</ParentContext.Provider>
}
