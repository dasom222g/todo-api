import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

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
  items: {
    byId: byIdType
    allIds: string[]
  }
}

export type TodoDataType = {
  title: string
  description: string
  isComplete: boolean
}

export type TodoDataIDType = {
  id: number
  title: string
  description: string
  isComplete: boolean
}

export type AsyncTodoType = {
  isLoading: boolean
  data: NormalDataType
  selectedItem: byIdType | null
  error: object | null
}

export type ActionType =
  | { type: 'ADD_TODO_SUCSESS'; payload: TodoDataIDType; id: string }
  | { type: 'ADD_TODO_ERROR'; error: object }
  | { type: 'UPDATE_TODO'; payload: TodoDataIDType }
  | { type: 'UPDATE_TODO_ERROR'; error: object }
  | { type: 'DELETE_TODO'; id: string }
  | { type: 'DELETE_TODO_ERROR'; error: object }
  | { type: 'FETCH_TODOS_SUCCESS'; payload: TodoDataIDType[] }
  | { type: 'FETCH_TODOS_ERROR'; error: object }
  | { type: 'FETCH_TODO' }
  | { type: 'FETCH_TODO_SUCCESS'; payload: TodoDataIDType; id: string }
  | { type: 'FETCH_TODO_ERROR'; error: object }

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
