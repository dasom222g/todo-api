import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import {AsyncTodoType, TodoListType} from '../type/type'
import { header } from '../variable/variable'

const initialState = {
  list: {
    isLoading: false,
    data: null,
    error: null
  },
  item: {
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

export type ActionType =
  | { type: 'LIST_LOADING' }
  | { type: 'LIST_SUCCESS', data: TodoListType[] }
  | { type: 'LIST_ERROR', error: object }
  | { type: 'ITEM_LOADING' }
  | { type: 'ITEM_SUCCESS', data: TodoListType }
  | { type: 'ITEM_ERROR', error: object }

const reducer = (state: AsyncTodoType, action: ActionType): AsyncTodoType => {
  switch (action.type) {
    case 'LIST_LOADING':
      return {
        ...state,
        list: loadingState
      }
    case 'LIST_SUCCESS':
      return {
        ...state,
        list: successState(action.data)
      }
    case 'LIST_ERROR':
      return {
        ...state,
        list: errorState(action.error)
      }
    case 'ITEM_LOADING':
      return {
        ...state,
        item: loadingState
      }
    case 'ITEM_SUCCESS':
      return {
        ...state,
        item: successState(action.data)
      }
    case 'ITEM_ERROR':
      return {
        ...state,
        item: errorState(action.error)
      }
    default:
      throw new Error(`unHandled action ${action}`)
  }
}

const TodoStateContext = createContext<AsyncTodoType | null>(null)
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
  dispatch({ type: 'LIST_LOADING' })
  try {
    const response = await fetch('/api/todos', header)
    let responseData = await response.json()
    dispatch({type: 'LIST_SUCCESS', data: responseData})
  } catch (e) {
    dispatch({type: 'LIST_ERROR', error: e})
  }
}

export async function postTodoList (dispatch: Dispatch<ActionType>, todoList: TodoListType[], newItem?: TodoListType) {
  try {
    if (newItem) {
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newItem)
      })
    } else {
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(todoList)
      })
    }
    const response = await fetch('/api/todos', header)
    let responseData = await response.json()
    dispatch({type: 'LIST_SUCCESS', data: responseData})
  } catch (e) {
    dispatch({type: 'LIST_ERROR', error: e})
  }
}

export async function getTodoItem (dispatch: Dispatch<ActionType>) {
  dispatch({ type: 'ITEM_LOADING' })
  try {
    const response = await fetch('/api/todos', header)
    let responseData = await response.json()
    dispatch({type: 'ITEM_SUCCESS', data: responseData})
  } catch (e) {
    dispatch({type: 'ITEM_ERROR', error: e})
  }
}
