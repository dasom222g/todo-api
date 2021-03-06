import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import produce from 'immer'
import { TodoDataType, TodoDataIDType, NormalDataType, AsyncTodoType, byIdType } from '../type/type'
import { header, sleep } from '../variable/variable'

const todosInitialState:NormalDataType = {
  items: {
    byId: {},
    allIds: []
  }
}

const initialState = {
  isLoading: false,
  data: todosInitialState,
  selectedItem: null,
  error: null
}

const addItem = (data:NormalDataType, newItem: TodoDataIDType) => {
  const id = newItem.id.toString()
  return produce(data, draft => {
    const { allIds, byId } = draft.items
    allIds.push(id)
    byId[id] = newItem
  })
}

const getList = (data: TodoDataIDType[]): NormalDataType => {
  const allIds = data.map(item => item.id.toString())
  const byId: byIdType = {}
  data.forEach(item => {
    byId[item.id.toString()] = item
  })
  const todosData: NormalDataType = {
    items: {
      byId,
      allIds
    }
  }
  return todosData
}

const removeData = (data: NormalDataType, id: string) => {
  const allIds = data.items.allIds.filter(itemId => itemId !== id)
  const byId = produce(data.items.byId, draft => {
    delete draft[id]
  })

  const todosData: NormalDataType = {
    items: {
      byId,
      allIds
    }
  }
  return todosData
}

export type ActionType =
  | { type: 'ADD_TODO', payload: TodoDataIDType}
  | { type: 'ADD_TODO_ERROR', error: object}
  | { type: 'UPDATE_TODO', payload: TodoDataIDType}
  | { type: 'UPDATE_TODO_ERROR', error: object}
  | { type: 'DELETE_TODO', id: string}
  | { type: 'DELETE_TODO_ERROR', error: object}
  | { type: 'FETCH_TODOS_SUCCESS', payload: TodoDataIDType[] }
  | { type: 'FETCH_TODOS_ERROR', error: object }
  | { type: 'FETCH_TODO' }
  | { type: 'FETCH_TODO_SUCCESS', payload: TodoDataIDType }
  | { type: 'FETCH_TODO_ERROR', error: object }

const reducer = (state: AsyncTodoType, action: ActionType): AsyncTodoType => {
  switch (action.type) {
    case 'ADD_TODO':
      return produce(state, draft => {
        draft.isLoading = false
        draft.selectedItem = null
        draft.error = null
        // state.data는 initial값으로 세팅하므로 null일경우 없음
        draft.data = addItem(state.data, action.payload)
      })
    case 'ADD_TODO_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = todosInitialState
        draft.selectedItem = null
        draft.error = action.error
      })
    case 'UPDATE_TODO':
      const id = action.payload.id
      return produce(state, draft => {
        draft.isLoading = false
        draft.data.items.byId[id] = action.payload
        draft.selectedItem = null
        draft.error = null
      })
    case 'UPDATE_TODO_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = todosInitialState
        draft.selectedItem = null
        draft.error = action.error
      })
    case 'DELETE_TODO':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = removeData(state.data, action.id)
        draft.selectedItem = null
        draft.error = null
      })
    case 'DELETE_TODO_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = todosInitialState
        draft.selectedItem = null
        draft.error = action.error
      })
    case 'FETCH_TODOS_SUCCESS':
      return produce(state, draft => {
        draft.isLoading = false
        action.payload ? draft.data = getList(action.payload) : draft.data = todosInitialState
        draft.selectedItem = null
        draft.error = null
      })
    case 'FETCH_TODOS_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = todosInitialState
        draft.selectedItem = null
        draft.error = action.error
      })
    case 'FETCH_TODO':
      return produce(state, draft => {
        draft.isLoading = true
        draft.data = todosInitialState
        draft.selectedItem = null
        draft.error = null
      })
    case 'FETCH_TODO_SUCCESS':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = todosInitialState
        draft.selectedItem = action.payload
        draft.error = null
      })
    case 'FETCH_TODO_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = todosInitialState
        draft.selectedItem = null
        draft.error = action.error
      })
    default:
      return state
  }
}

// context를 state와 dispatch로 나누어 생성
const TodoStateContext = createContext<AsyncTodoType | null>(null)
const TodoDispatchContext = createContext<Dispatch<ActionType> | null>(null)

// context(state, dispatch)를 감싸져있는 children에서 참조할 수있도록 구조 정의
type TodoProviderProps = {
  children: React.ReactNode
}

export function TodoProvider({children}: TodoProviderProps) {
  // 상태 참조및 변경해주는 reducer 해당 레벨에서 사용하여 전파
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <TodoStateContext.Provider value ={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

// 외부에서 상태 참조 및 디스패치로 상태 변경 가능하게끔 해줌
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

// api 호출하여 dispatch로 상태변경 가능하게끔 하는 로직
export async function getTodos (dispatch: Dispatch<ActionType>) {
  try {
    const response = await fetch('/api/todos', header)
    let responseData = await response.json()
    dispatch({type: 'FETCH_TODOS_SUCCESS', payload: responseData})
  } catch (e) {
    dispatch({type: 'FETCH_TODOS_ERROR', error: e})
  }
}

export async function getTodo (dispatch: Dispatch<ActionType>, id: string) {
  dispatch({ type: 'FETCH_TODO' })
  await sleep(200)
  try {
    const response = await fetch(`/api/todos/${id}`, header)
    let responseData: TodoDataIDType = await response.json()
    dispatch({type: 'FETCH_TODO_SUCCESS', payload: responseData})
  } catch (e) {
    dispatch({type: 'FETCH_TODO_ERROR', error: e})
  }
}

export async function postTodo (dispatch: Dispatch<ActionType>, newItem: TodoDataType) {
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newItem),
    })
    const responseData = await response.json()
    dispatch({type: 'ADD_TODO', payload: responseData})
  } catch (e) {
    dispatch({type: 'ADD_TODO_ERROR', error: e})
  }
}

export async function putTodo (dispatch: Dispatch<ActionType>, item: TodoDataIDType) {
  try {
    const response = await fetch(`/api/todos/${item.id}`, {
      method: 'PUT',
      body : JSON.stringify(item),
    })
    const responseData = await response.json()
    dispatch({type: 'UPDATE_TODO', payload: responseData})
  } catch(e) {
    dispatch({type: 'UPDATE_TODO_ERROR', error: e})
  }
}

export async function deleteTodo(dispatch: Dispatch<ActionType>, id: string) {
  try {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    dispatch({type: 'DELETE_TODO', id})
  } catch (e) {
    dispatch({type: 'DELETE_TODO_ERROR', error: e})
  }
}

