import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
  FETCH_TODO,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_ERROR,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
} from '../modules/todos'

export type SampleStateType = 'loading' | 'success' | 'error'

export type SampleTodoItemType = {
  id: number
  title: string
}

export type SampleTodosType = {
  loading: boolean
  data: SampleTodoItemType | null
  state: SampleStateType
}

export type FormType = {
  title: string
  description: string
}

export type byIdType = {
  [key: string]: TodoDataIDType
}

export type NormalDataType = {
  byId: byIdType
  allIds: string[]
}

export type TodoDataType = {
  title: string
  description?: string
  isComplete?: boolean
}

export type TodoDataIDType = {
  id: number
  title: string
  description: string
  isComplete: boolean
}

export type AsyncTodoType = {
  isLoading: boolean
  items: NormalDataType
  error: object | null
}

export type ActionType =
  | { type: typeof FETCH_TODOS_SUCCESS; payload: TodoDataIDType[] }
  | { type: typeof FETCH_TODOS_ERROR; error: object }
  | { type: typeof FETCH_TODO }
  | { type: typeof FETCH_TODO_SUCCESS; payload: TodoDataIDType; id: string }
  | { type: typeof FETCH_TODO_ERROR; error: object }
  | { type: typeof ADD_TODO_SUCCESS; payload: TodoDataIDType; id: string }
  | { type: typeof ADD_TODO_ERROR; error: object }
  | { type: typeof UPDATE_TODO_SUCCESS; payload: TodoDataIDType }
  | { type: typeof UPDATE_TODO_ERROR; error: object }
  | { type: typeof DELETE_TODO_SUCCESS; id: string }
  | { type: typeof DELETE_TODO_ERROR; error: object }

export const formInitialState = {
  title: '',
  description: '',
}

export interface IRootState {
  todos: AsyncTodoType
}

export type ThunkTodoDispatchType = ThunkDispatch<AsyncTodoType, ActionType, AnyAction>

// const initialState = {
//   isLoading: false,
//   todos: {
//     allIds: ['1'],
//     byId: {
//       '1': {
//         id: 1,
//         title: '할일',
//         description: '할일 설명',
//         isComplete: false,
//       }
//     }
//   },
//   error: null
// }
