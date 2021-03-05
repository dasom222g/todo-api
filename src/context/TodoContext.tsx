import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import {AsyncTodoType, TodoListType} from '../type/type'
import { header, sleep } from '../variable/variable'

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
  | { type: 'ADD_TODO', payload: TodoListType}
  | { type: 'GET_LIST_LOADING' }
  | { type: 'GET_LIST_SUCCESS', data: TodoListType[] }
  | { type: 'GET_LIST_ERROR', error: object }
  | { type: 'GET_ITEM_LOADING' }
  | { type: 'GET_ITEM_SUCCESS', data: TodoListType }
  | { type: 'GET_ITEM_ERROR', error: object }
  
  // | { type: 'POST_ITEM_SUCCESS', data: TodoListType }
  // | { type: 'POST_ITEM_ERROR', error: object }
  // | { type: 'PUT_ITEM_SUCCESS', data: TodoListType }
  // | { type: 'PUT_ITEM_ERROR', error: object }
  // | { type: 'DELETE_ITEM_SUCCESS', data: TodoListType }
  // | { type: 'DELETE_ITEM_ERROR', error: object }

const reducer = (state: AsyncTodoType, action: ActionType): AsyncTodoType => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        list: {
          isLoading: false,
          error: null,
          data: state.list.data && [...state.list.data, action.payload]
        }
      }
    case 'GET_LIST_LOADING':
      return {
        ...state,
          list: {
            ...state.list,
            isLoading: true,
          }
        }
    case 'GET_LIST_SUCCESS':
      return {
        ...state,
        list: successState(action.data)
      }
    case 'GET_LIST_ERROR':
      return {
        ...state,
        list: errorState(action.error)
      }
    case 'GET_ITEM_LOADING':
      return {
        ...state,
        item: loadingState
      }
    case 'GET_ITEM_SUCCESS':
      return {
        ...state,
        item: successState(action.data)
      }
    case 'GET_ITEM_ERROR':
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

// api function

export async function getTodoList (dispatch: Dispatch<ActionType>) {
  dispatch({ type: 'GET_LIST_LOADING' })
  await sleep(500)
  try {
    const response = await fetch('/api/todos', header)
    let responseData = await response.json()
    dispatch({type: 'GET_LIST_SUCCESS', data: responseData})
  } catch (e) {
    dispatch({type: 'GET_LIST_ERROR', error: e})
  }
}

export async function getTodoItem (dispatch: Dispatch<ActionType>, id: number) {
  dispatch({ type: 'GET_ITEM_LOADING' })
  await sleep(500)
  try {
    const response = await fetch(`/api/todos/${id}`, header)
    let responseData = await response.json()
    dispatch({type: 'GET_ITEM_SUCCESS', data: responseData})
  } catch (e) {
    dispatch({type: 'GET_ITEM_ERROR', error: e})
  }
}

export async function postTodo (dispatch: Dispatch<ActionType>, newItem: {title: string; description: string}) {
  dispatch({ type: 'GET_LIST_LOADING' })
  await sleep(500)
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newItem),
    })
    let responseData = await response.json()
    dispatch({type: 'ADD_TODO', payload: responseData})
    
  } catch (e) {
    dispatch({type: 'GET_LIST_ERROR', error: e})
  }
}

export async function putTodo (dispatch: Dispatch<ActionType>, item: TodoListType) {
  try {
    await fetch(`/api/todos/${item.id}`, {
      method: 'PUT',
      body : JSON.stringify(item),
    })
    const response = await fetch('/api/todos', header)
    let responseData = await response.json()
    dispatch({type: 'GET_LIST_SUCCESS', data: responseData})
  } catch(e) {
    dispatch({type: 'GET_LIST_ERROR', error: e})
  }
}

export async function deleteTodo(dispatch: Dispatch<ActionType>, id: number) {
  try {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    const response = await fetch('/api/todos', header)
    let responseData = await response.json()
    dispatch({type: 'GET_LIST_SUCCESS', data: responseData})
  } catch (e) {
    dispatch({type: 'GET_LIST_ERROR', error: e})
  }
}

