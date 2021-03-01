import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import {AsyncType, TodoListType} from '../type/type'
import { header } from '../variable/variable'

const initialState = {
  isLoading: false,
  data: null,
  error: null
}

export type ActionType = 
  | { type: 'LOADING' }
  | { type: 'SUCCESS', data: TodoListType[] }
  | { type: 'ERROR', error: object }

const reducer = (state: AsyncType, action: ActionType): AsyncType => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null
      }
    case 'SUCCESS': 
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null
      }
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.error
      }
    default:
      throw new Error(`unHandled action ${action}`)
  }
}

const TodoStateContext = createContext<AsyncType | null>(null)
const TodoDispatchContext = createContext<Dispatch<ActionType> | null>(null)

type TodoProviderProps = {
  children: React.ReactNode
}

export function TodoProvider({children}: TodoProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <TodoStateContext.Provider value ={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

export function useTodoState () {
  const state = useContext(TodoStateContext)
  if(!state) throw new Error('Can not find TodoState Provider')
  return state
}

export function useTodoDispatch () {
  const dispatch = useContext(TodoDispatchContext)
  if(!dispatch) throw new Error('Can not find TodoDispatch Provider')
  return dispatch
}

export async function getTodoList (dispatch: Dispatch<ActionType>) {
  dispatch({ type: 'LOADING' })
  try {
    const response = await fetch('/api-get-todos', header)
    let responseData = await response.json()
    dispatch({type: 'SUCCESS', data: responseData})
  } catch (e) {
    dispatch({type: 'ERROR', error: e})
  }
}
