import { Dispatch } from 'react'
import { produce } from 'immer'
import {
  ActionType,
  AsyncTodoType,
  byIdType,
  NormalDataType,
  TodoDataIDType,
  TodoDataType,
} from '../type/type'
import { header, sleep } from '../variable/variable'
import { errorState, successState } from '../utils/asyncUtils'

// action type

export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
export const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR'
export const FETCH_TODO = 'FETCH_TODO'
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS'
export const FETCH_TODO_ERROR = 'FETCH_TODO_ERROR'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
export const UPDATE_TODO_ERROR = 'UPDATE_TODO_ERROR'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
export const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR'

// action creator

const fetchTodos = (payload: TodoDataIDType[]): ActionType => ({
  type: FETCH_TODOS_SUCCESS,
  payload,
})

const fetchTodosError = <T extends object>(e: T): ActionType => ({
  type: FETCH_TODOS_ERROR,
  error: e,
})

const fetchTodo = (): ActionType => ({
  type: FETCH_TODO,
})

const fetchTodoSuccess = (payload: TodoDataIDType, id: string): ActionType => ({
  type: FETCH_TODO_SUCCESS,
  payload,
  id,
})

const fetchTodoError = <T extends object>(e: T): ActionType => ({
  type: FETCH_TODO_ERROR,
  error: e,
})

const addTodoSuccess = (newItem: TodoDataIDType): ActionType => ({
  type: ADD_TODO_SUCCESS,
  payload: newItem,
  id: newItem.id.toString(),
})

const addTodoError = <T extends object>(e: T): ActionType => ({
  type: ADD_TODO_ERROR,
  error: e,
})

const updateTodo = (changeItem: TodoDataIDType): ActionType => ({
  type: UPDATE_TODO_SUCCESS,
  payload: changeItem,
})

const updateTodoError = <T extends object>(e: T): ActionType => ({
  type: UPDATE_TODO_ERROR,
  error: e,
})

const deleteTodo = (id: string): ActionType => ({
  type: DELETE_TODO_SUCCESS,
  id,
})

const deleteTodoError = <T extends object>(e: T): ActionType => ({
  type: DELETE_TODO_ERROR,
  error: e,
})

// thunk creator

export const getTodos = () => async (dispatch: Dispatch<ActionType>) => {
  try {
    const respose = await fetch('/api/todos', header)
    const data = await respose.json()
    dispatch(fetchTodos(data))
  } catch (e) {
    dispatch(fetchTodosError(e))
  }
}

export const getTodo = (id: string) => async (dispatch: Dispatch<ActionType>) => {
  dispatch(fetchTodo())
  await sleep(500)
  try {
    const response = await fetch(`/api/todos/${id}`)
    const result = await response.json()
    dispatch(fetchTodoSuccess(result, id))
  } catch (e) {
    dispatch(fetchTodoError(e))
  }
}

export const postTodo = (title: string) => async (dispatch: Dispatch<ActionType>) => {
  const newItem: TodoDataType = {
    title,
  }
  try {
    const response = await fetch('api/todos', {
      method: 'POST',
      body: JSON.stringify(newItem),
    })
    const result: TodoDataIDType = await response.json()
    dispatch(addTodoSuccess(result))
  } catch (e) {
    dispatch(addTodoError(e))
  }
}

export const putTodo = (changeItem: TodoDataIDType) => async (dispatch: Dispatch<ActionType>) => {
  const id = changeItem.id.toString()
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(changeItem),
    })
    const result = await response.json()
    dispatch(updateTodo(result))
  } catch (e) {
    dispatch(updateTodoError(e))
  }
}

export const removeTodo = (id: string) => async (dispatch: Dispatch<ActionType>) => {
  try {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    dispatch(deleteTodo(id))
  } catch (e) {
    dispatch(deleteTodoError(e))
  }
}

// reducer

export const todosInitialState: NormalDataType = {
  byId: {},
  allIds: [],
}

const initialState: AsyncTodoType = {
  isLoading: false,
  items: todosInitialState,
  error: null,
}

const getList = (data: TodoDataIDType[] | null): NormalDataType => {
  const allIds = data ? data.map((todo) => todo.id.toString()) : []
  const byId = data
    ? data.reduce((acc: byIdType, current: TodoDataIDType) => {
        const id = current.id.toString()
        acc[id] = current
        return acc
      }, {})
    : {}
  return {
    allIds,
    byId,
  }
}

const getItem = (stateData: NormalDataType, item: TodoDataIDType, id: string): NormalDataType => {
  return produce(stateData, (draft) => {
    draft.byId[id] = item
  })
}

const addItem = (
  stateData: NormalDataType,
  newItem: TodoDataIDType,
  id: string,
): NormalDataType => {
  const { byId, allIds } = stateData
  return {
    allIds: [...allIds, id],
    byId: {
      ...byId,
      [id]: newItem,
    },
  }
}

const updateItem = (stateData: NormalDataType, changeItem: TodoDataIDType): NormalDataType => {
  const { allIds, byId } = stateData
  const id = changeItem.id.toString()
  return {
    allIds,
    byId: {
      ...byId,
      [id]: changeItem,
    },
  }
}

const removeItem = (stateData: NormalDataType, id: string): NormalDataType => {
  const allIds = stateData.allIds.filter((itemId) => itemId !== id)
  const byId = allIds.reduce((acc: byIdType, current: string) => {
    if (current !== id) {
      acc[current] = stateData.byId[current]
    }
    return acc
  }, {})
  return {
    allIds,
    byId,
  }
}

export default function todos(
  state: AsyncTodoType = initialState,
  action: ActionType,
): AsyncTodoType {
  switch (action.type) {
    case FETCH_TODO:
      return produce(state, (draft) => {
        draft.isLoading = true
        draft.error = null
      })
    case ADD_TODO_SUCCESS:
      return successState(state, action, addItem(state.items, action.payload, action.id))
    case UPDATE_TODO_SUCCESS:
      return successState(state, action, updateItem(state.items, action.payload))
    case FETCH_TODOS_SUCCESS:
      return successState(state, action, getList(action.payload))
    case FETCH_TODO_SUCCESS:
      return successState(state, action, getItem(state.items, action.payload, action.id))
    case DELETE_TODO_SUCCESS:
      return successState(state, action, removeItem(state.items, action.id))
    case ADD_TODO_ERROR:
    case FETCH_TODOS_ERROR:
    case FETCH_TODO_ERROR:
    case UPDATE_TODO_ERROR:
    case DELETE_TODO_ERROR:
      return errorState(state, action)
    default:
      return state
  }
}
