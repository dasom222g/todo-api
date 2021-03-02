import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import { header } from '../variable/variable'

type StateType = {
  isLoading: boolean,
  data: any,
  error: object | null
}

type StateTypeOuter = {
  users: StateType,
  user: StateType
}

const initialState = {
  users: {
    isLoading: false,
    data: null,
    error: null
  },
  user: {
    isLoading: false,
    data: null,
    error: null
  }
}

const loadingState = {
  isLoading: true,
  data: null,
  error: null
}

const successState = (data: any) => ({
  isLoading: false,
  data,
  error: null
})

const errorState = (error: object) => ({
  isLoading: false,
  data: null,
  error: error
})

type ActionType =
  | { type: 'GET_USERS_LOADING'}
  | { type: 'GET_USERS_SUCCESS', data: any }
  | { type: 'GET_USERS_ERROR', error:object }
  | { type: 'GET_USER_LOADING'}
  | { type: 'GET_USER_SUCCESS', data: any }
  | { type: 'GET_USER_ERROR', error:object }

const UserReducer = (state: StateTypeOuter, action: ActionType): StateTypeOuter => {
  switch(action.type) {
    case 'GET_USERS_LOADING':
      return {
        ...state,
        users: loadingState
      }
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        users: successState(action.data)
      }
    case 'GET_USERS_ERROR':
      return {
        ...state,
        users: errorState(action.error)
      }
    case 'GET_USER_LOADING':
      return {
        ...state,
        user: loadingState
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: successState(action.data)
      }
    case 'GET_USER_ERROR':
      return {
        ...state,
        user: errorState(action.error)
      }
    default:
      throw new Error(`unHandled type ${action}`)
  }
}

const UsersStateContext = createContext<StateTypeOuter | null>(null)
const UsersDispatchContext = createContext<Dispatch<ActionType> | null>(null)

type UserProviderProps = {
  children: React.ReactNode
}

export function UsersProvider({ children }:UserProviderProps) {
  const [state, dispatch] = useReducer(UserReducer, initialState)
  return (
    <div>
      <UsersStateContext.Provider value={state}>
        <UsersDispatchContext.Provider value={dispatch}>
          {children}
        </UsersDispatchContext.Provider>
      </UsersStateContext.Provider>
    </div>
  )
}

export function useUsersState() {
  const state = useContext(UsersStateContext)
  if (!state) throw new Error('Can not find UserState Provider')
  return state
}

export function useUsersDispatch() {
  const dispatch = useContext(UsersDispatchContext)
  if (!dispatch) throw new Error('Can not find UserState Provider')
  return dispatch
}

export async function getUsers (dispatch: Dispatch<ActionType>) {
  dispatch( {type: 'GET_USERS_LOADING'} )
  try {
    const response = await fetch('/api/get-data', header)
    let responseData = await response.json()
    dispatch( {type: 'GET_USERS_SUCCESS', data: responseData } )
  } catch(e) {
    dispatch( {type: 'GET_USERS_ERROR', error: e })
  }
}

export async function getUser (dispatch: Dispatch<ActionType>, id: number) {
  dispatch( {type: 'GET_USER_LOADING'} )
  try {
    const response = await fetch(`/api/get-data/${id}`, header)
    let responseData = await response.json()
    dispatch( {type: 'GET_USER_SUCCESS', data: responseData } )
  } catch(e) {
    dispatch( {type: 'GET_USER_ERROR', error: e })
  }
}



