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
