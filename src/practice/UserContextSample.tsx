import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import * as api from './apiSample'
import createAsyncDispatcher, { createAsyncHandler, initialAsyncState } from './asyncActionUtils'

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
  users: initialAsyncState,
  user: initialAsyncState
}

type ActionType = 
  | { type: 'GET_USERS_LOADING'} 
  | { type: 'GET_USERS_SUCCESS', data: any }
  | { type: 'GET_USERS_ERROR', error:object }
  | { type: 'GET_USER_LOADING'} 
  | { type: 'GET_USER_SUCCESS', data: any }
  | { type: 'GET_USER_ERROR', error:object }


const usersHandler = createAsyncHandler('GET_USERS', 'users')
const userHandler = createAsyncHandler('GET_USER', 'user')
const UserReducer = (state: StateTypeOuter, action: ActionType): StateTypeOuter => {
  switch(action.type) {
    case 'GET_USERS_LOADING':
    case 'GET_USERS_SUCCESS':
    case 'GET_USERS_ERROR':
      return usersHandler(state, action)
    case 'GET_USER_LOADING':
    case 'GET_USER_SUCCESS':
    case 'GET_USER_ERROR':
      return userHandler(state, action)
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

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers)
export const getUser = createAsyncDispatcher('GET_USER', api.getUser)




