import React from 'react'

type GetType = 'GET_USERS' | 'GET_USER'
type GetKey = 'users' | 'user'

// type ActionType = 
//   | { type: 'GET_USERS_LOADING'} 
//   | { type: 'GET_USERS_SUCCESS', data: any }
//   | { type: 'GET_USERS_ERROR', error:object }
//   | { type: 'GET_USER_LOADING'} 
//   | { type: 'GET_USER_SUCCESS', data: any }
//   | { type: 'GET_USER_ERROR', error:object }

type StateType = {
  isLoading: boolean,
  data: any,
  error: object | null
}

type StateTypeOuter = {
  users: StateType,
  user: StateType
}

export default function createAsyncDispatcher (type:GetType, promiseFn: any) {
  const LOADING = `${type}_LOADING`
  const SUCCESS = `${type}_SUCCESS`
  const ERROR = `${type}_ERROR`

  async function actionHandler(dispatch: React.Dispatch<any>, ...rest: any[]) {
    dispatch({ type: LOADING })
    try {
      const data = await promiseFn(...rest)
      console.log('rest', ...rest, 'data', data)
      dispatch({ type: SUCCESS, data })
    } catch(e) {
      dispatch({ type: ERROR, error: e })
    }
  }

  return actionHandler
}

export const initialAsyncState = {
  isLoading: false,
  data: null,
  error: null
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

export function createAsyncHandler (type: GetType, key: GetKey) {
  const LOADING = `${type}_LOADING`
  const SUCCESS = `${type}_SUCCESS`
  const ERROR = `${type}_ERROR`
  
  function handler (state: StateTypeOuter, action: any) {
    switch (action.type) {
      case LOADING:
        return {
          ...state,
          [key]: loadingState
        }
      case SUCCESS:
        return {
          ...state,
          [key]: successState(action.data)
        }
      case ERROR: 
        return {
          ...state,
          [key]: errorState(action.error)
        }
      default:
        return state
    }
  }
  return handler
}