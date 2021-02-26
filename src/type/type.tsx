export type stateType = 'loading' | 'success' | 'error'

export type todoItemType = {
  id: number,
  title: string
}

export type todosType = {
  loading: boolean,
  data: todoItemType | null,
  state: stateType
}