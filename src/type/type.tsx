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

export type byIdType = {
  [key: string]: TodoDataIDType
}

export type NormalDataType = {
  items: {
    byId: byIdType,
    allIds: string[]
  }
}

export type TodoDataType = {
  title: string,
  description: string,
  isComplete: boolean
}

export type TodoDataIDType = {
  id: number,
  title: string,
  description: string,
  isComplete: boolean
}

export type AsyncTodoType = {
  isLoading: boolean,
  data: NormalDataType,
  selectedItem: TodoDataIDType | null
  error: object | null,
}

// export let byIdType: { [key: string]: TodoDataIDType }


export const formInitialState = {
  title: '',
  description: ''
}



// const initialData = {
//   todos: {
//     byId: {
//       '0': {
//         id: '0',
//         title: '',
//         description: '',
//         isComplete: false
//       }
//     },
//     allIds: ['0']
//   }
// }