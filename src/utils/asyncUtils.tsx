import produce from 'immer'
import {
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_ERROR,
  ADD_TODO_SUCSESS,
  ADD_TODO_ERROR,
  UPDATE_TODO,
  UPDATE_TODO_ERROR,
  DELETE_TODO,
  DELETE_TODO_ERROR,
  todosInitialState,
} from '../modules/todos'
import { ActionType, AsyncTodoType, NormalDataType } from '../type/type'

export const errorState = (state: AsyncTodoType, action: ActionType): AsyncTodoType => {
  switch (action.type) {
    case ADD_TODO_ERROR:
    case FETCH_TODOS_ERROR:
    case FETCH_TODO_ERROR:
    case UPDATE_TODO_ERROR:
    case DELETE_TODO_ERROR:
      return produce(state, (draft) => {
        draft.isLoading = false
        draft.items = todosInitialState
        draft.error = action.error
      })
    default:
      return state
  }
}

export const successState = (
  state: AsyncTodoType,
  action: ActionType,
  items: NormalDataType,
): AsyncTodoType => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
    case FETCH_TODO_SUCCESS:
    case ADD_TODO_SUCSESS:
    case UPDATE_TODO:
    case DELETE_TODO:
      return produce(state, (draft) => {
        draft.isLoading = false
        draft.items = items
        draft.error = null
      })
    default:
      return state
  }
}
