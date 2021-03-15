import { Dispatch } from 'react'
import {
  ActionType,
  AsyncTodoType,
  byIdType,
  NormalDataType,
  TodoDataIDType,
  TodoDataType,
} from '../type/type'
import { header } from '../variable/variable'

// action type

const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR'
const ADD_TODO_SUCSESS = 'ADD_TODO_SUCSESS'
const ADD_TODO_ERROR = 'ADD_TODO_ERROR'

// action creator

const fetchTodos = (payload: TodoDataIDType[]): ActionType => ({
  type: FETCH_TODOS_SUCCESS,
  payload,
})

const fetchTodosError = <T extends object>(e: T): ActionType => ({
  type: FETCH_TODOS_ERROR,
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

export const postTodo = (title: string) => async (dispatch: Dispatch<ActionType>) => {
  const newItem: TodoDataType = {
    title,
    description: '',
    isComplete: false,
  }
  try {
    const response = await fetch('api/todos', {
      method: 'POST',
      body: JSON.stringify(newItem),
    })
    const result: TodoDataIDType = await response.json()
    dispatch(addTodoSuccess(result))
  } catch (e) {
    console.error(e)
    dispatch(addTodoError(e))
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
  selectedItem: null,
  error: null,
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

const getList = (data: TodoDataIDType[] | null) => {
  const allIds = data ? data.map((todo) => todo.id.toString()) : []
  let byId: byIdType = {}
  data &&
    data.forEach((item) => {
      byId[item.id.toString()] = item
    })
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
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: getList(action.payload),
        error: null,
      }
    case FETCH_TODOS_ERROR:
      console.log('error', typeof action.error, action.error)
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