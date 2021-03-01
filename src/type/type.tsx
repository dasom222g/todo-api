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
  title: string
}

export type TodoListType = {
  id: number,
  title: string,
  description: string,
  isComplete: boolean
}

export type AsyncType = {
  isLoading: boolean,
  data:TodoListType[] | null,
  error: object | null
}
