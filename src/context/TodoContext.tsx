import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import produce from 'immer'
import { TodoDataType, TodoDataIDType, NormalDataType, AsyncTodoType } from '../type/type'
import { header, sleep } from '../variable/variable'


const initialState = {
  isLoading: false,
  data: null,
  error: null
}

const successData = (data:TodoDataIDType) => {
  const { id, title, description, isComplete} = data
  return  {
    todos: {
      byId: {
        [id] : {
          id,
          title,
          description,
          isComplete
        }
      },
      allIds: [id.toString()]
    }
  }
}

export type ActionType =
  | { type: 'ADD_TODO', payload: TodoDataIDType}
  | { type: 'GET_TODO' }
  | { type: 'GET_TODO_SUCCESS', payload: TodoDataIDType[] }
  | { type: 'GET_TODO_ERROR', error: object }
  | { type: 'GET_ITEM' }
  | { type: 'GET_ITEM_SUCCESS', data: NormalDataType<{}> }
  | { type: 'GET_ITEM_ERROR', error: object }

let draftDataType: { todos: { byId: { [x: string]: {} }, allIds: string[] } }
let byIdType: { [x: string]: {} }

const reducer = (state: AsyncTodoType, action: ActionType): AsyncTodoType => {
  switch (action.type) {
    case 'ADD_TODO':
      const {title, description, isComplete} = action.payload
      const stringId = action.payload.id.toString()
      return produce(state, draft => {
        draft.isLoading = false
        draft.error = null
        if (state.data) {
          produce(state.data, (draftData: typeof draftDataType) => {
            draftData.todos.byId[stringId] = {
              title,
              description,
              isComplete
            }
            draftData.todos.allIds.push(stringId)
          })
        } else {
          successData(action.payload)
        }
      })
    case 'GET_TODO':
      return produce(state, draft => {
        draft.isLoading = true
        draft.data = null
        draft.error = null
      })
    case 'GET_TODO_SUCCESS':
      return produce(state, draft => {
        draft.isLoading = false
        draft.error = null
        if (action.payload) {
          const byId: typeof byIdType = {}
          const allIds = action.payload.map(item => item.id.toString())

          action.payload.forEach(item => {
            byId[item.id.toString()] = item
          })
          draft.data = {
            todos: {
              byId,
              allIds
            }
          }
          console.log('draft.data', draft.data)
          console.log('allIds', allIds)
          console.log('byId', byId)
        }
      })
    case 'GET_TODO_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = null
        draft.error = action.error
      })
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
  dispatch({ type: 'GET_TODO' })
  await sleep(500)
  try {
    const response = await fetch('/api/todos', header)
    let responseData = await response.json()
    dispatch({type: 'GET_TODO_SUCCESS', payload: responseData})
  } catch (e) {
    dispatch({type: 'GET_TODO_ERROR', error: e})
  }
}

export async function getTodoItem (dispatch: Dispatch<ActionType>, id: number) {
  dispatch({ type: 'GET_ITEM' })
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
  dispatch({ type: 'GET_TODO' })
  await sleep(500)
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newItem),
    })
    let data = await response.json()
    dispatch({type: 'ADD_TODO', payload: data})

  } catch (e) {
    dispatch({type: 'GET_TODO_ERROR', error: e})
  }
}

export async function putTodo (dispatch: Dispatch<ActionType>, item: TodoDataType, id: number) {
  try {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body : JSON.stringify(item),
    })
    const response = await fetch('/api/todos', header)
    let responseData = await response.json()
    console.log('responseData', responseData)
  } catch(e) {
    dispatch({type: 'GET_TODO_ERROR', error: e})
  }
}

export async function deleteTodo(dispatch: Dispatch<ActionType>, id: number) {
  try {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    const response = await fetch('/api/todos', header)
    let responseData = await response.json()
    console.log('responseData', responseData)
  } catch (e) {
    dispatch({type: 'GET_TODO_ERROR', error: e})
  }
}

