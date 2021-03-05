export type SampleStateType = 'loading' | 'success' | 'error'

export type SampleTodoItemType = {
  id: number,
  title: string
}

export type SampleTodosType = {
  loading: boolean,
  data: SampleTodoItemType | null,
  state: SampleStateType
}

export type FormType = {
  title: string,
  description: string
}

export type TodoListType = {
  id: number,
  title: string,
  description: string,
  isComplete: boolean
}

type ListStateType = {
  isLoading: boolean,
  data: TodoListType[] | null,
  error: object | null
}
type ItemStateType = {
  isLoading: boolean,
  data: TodoListType | null,
  error: object | null
}

export type AsyncTodoType = {
  list: ListStateType,
  item: ItemStateType
}

export const formInitialState = {
  title: '',
  description: ''
}
