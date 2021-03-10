// action type 정의

const ADD_TODO = 'todo/ADD_TODO'
const COMPLETE_TODO = 'todo/COMPLETE_TODO'

export type TodoItemType = {
  id: number,
  title: string,
  isComplete: boolean
}


export type TodoActionType =
  | {type: typeof ADD_TODO, payload: TodoItemType}
  | {type: typeof COMPLETE_TODO, id: number}

const initialState: TodoItemType[] = []

// action 생성 함수

let nextId = 1

export const addTodo = (text: string): TodoActionType => ({
  type: ADD_TODO,
  payload: {
    id: nextId++,
    title: text,
    isComplete: false
  }
})

export const completeTodo = (id: number): TodoActionType => ({
  type: COMPLETE_TODO,
  id
})

// reducer

const todosReducer = (state: TodoItemType[] = initialState, action: TodoActionType): TodoItemType[] => {
  switch(action.type) {
    case ADD_TODO:
      return [...state, action.payload]
    case COMPLETE_TODO:
      return [...state].map(item => item.id === action.id ? {...item, isComplete: !item.isComplete} : item)
    default:
      return state
  }
}


export default todosReducer