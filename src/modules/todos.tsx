import { Dispatch } from 'react'
import {
  ActionType,
  AsyncTodoType,
  byIdType,
  NormalDataType,
  TodoDataIDType,
  TodoDataType,
} from '../type/type'
import { header, sleep } from '../variable/variable'

// action type

const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR'
const FETCH_TODO = 'FETCH_TODO'
const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS'
const FETCH_TODO_ERROR = 'FETCH_TODO_ERROR'
const ADD_TODO_SUCSESS = 'ADD_TODO_SUCSESS'
const ADD_TODO_ERROR = 'ADD_TODO_ERROR'
const UPDATE_TODO = 'UPDATE_TODO'
const UPDATE_TODO_ERROR = 'UPDATE_TODO_ERROR'
const DELETE_TODO = 'DELETE_TODO'
const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR'

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
  type: ADD_TODO_SUCSESS,
  payload: newItem,
  id: newItem.id.toString(),
})

const addTodoError = <T extends object>(e: T): ActionType => ({
  type: ADD_TODO_ERROR,
  error: e,
})

const updateTodo = (changeItem: TodoDataIDType): ActionType => ({
  type: UPDATE_TODO,
  payload: changeItem,
})

const updateTodoError = <T extends object>(e: T): ActionType => ({
  type: UPDATE_TODO_ERROR,
  error: e,
})

const deleteTodo = (id: string): ActionType => ({
  type: DELETE_TODO,
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

const todosInitialState: NormalDataType = {
  items: {
    byId: {},
    allIds: [],
  },
}

const initialState: AsyncTodoType = {
  isLoading: false,
  data: todosInitialState,
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
    items: {
      allIds,
      byId,
    },
  }
}

const addItem = (todos: NormalDataType, newItem: TodoDataIDType, id: string): NormalDataType => {
  const { byId, allIds } = todos.items
  return {
    items: {
      allIds: [...allIds, id],
      byId: {
        ...byId,
        [id]: newItem,
      },
    },
  }
}

const updateItem = (stateData: NormalDataType, changeItem: TodoDataIDType): NormalDataType => {
  const { allIds, byId } = stateData.items
  const id = changeItem.id.toString()
  return {
    items: {
      allIds,
      byId: {
        ...byId,
        [id]: changeItem,
      },
    },
  }
}

const removeItem = (stateData: NormalDataType, id: string): NormalDataType => {
  const allIds = stateData.items.allIds.filter((itemId) => itemId !== id)
  const byId = allIds.reduce((acc: byIdType, current: string) => {
    if (current !== id) {
      acc[current] = stateData.items.byId[current]
    }
    return acc
  }, {})
  return {
    items: {
      allIds,
      byId,
    },
  }
}

export default function todos(
  state: AsyncTodoType = initialState,
  action: ActionType,
): AsyncTodoType {
  switch (action.type) {
    case ADD_TODO_SUCSESS:
      return {
        ...state,
        isLoading: false,
        data: addItem(state.data, action.payload, action.id),
        error: null,
      }
    case ADD_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        data: todosInitialState,
        error: action.error,
      }
    case UPDATE_TODO:
      return {
        ...state,
        data: updateItem(state.data, action.payload),
        error: null,
      }
    case UPDATE_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        data: todosInitialState,
        error: action.error,
      }
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: getList(action.payload),
        error: null,
      }
    case FETCH_TODOS_ERROR:
      return {
        ...state,
        isLoading: false,
        data: todosInitialState,
        error: action.error,
      }
    case FETCH_TODO:
      return {
        ...state,
        isLoading: true,
        data: state.data,
        error: null,
      }
    case FETCH_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          items: {
            ...state.data.items,
            byId: {
              ...state.data.items.byId,
              [action.id]: action.payload,
            },
          },
        },
        error: null,
      }
    case FETCH_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        data: state.data,
        error: action.error,
      }
    case DELETE_TODO:
      return {
        ...state,
        isLoading: false,
        data: removeItem(state.data, action.id),
        error: null,
      }
    case DELETE_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        data: todosInitialState,
        error: action.error,
      }
    default:
      return state
  }
}
