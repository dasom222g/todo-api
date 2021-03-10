import React, { Dispatch } from 'react'
import Todos from '../components/Todos'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, completeTodo, TodoActionType, TodoItemType } from '../modules/todos'
import { CounterStateType } from '../modules/counter'

interface IRootState {
  counterReducer: CounterStateType,
  todosReducer: TodoItemType[]
}

function TodosContainer() {
  const todos = useSelector((state: IRootState) => state.todosReducer)
  const dispatch = useDispatch<Dispatch<TodoActionType>>()
  const onAddTodo = (title: string) => dispatch(addTodo(title))
  const onCompleteTodo = (id: number) => dispatch(completeTodo(id))

  return (
    <div>
      <Todos todos={todos} onAddTodo={onAddTodo} onCompleteTodo={onCompleteTodo} />
    </div>
  )
}

export default TodosContainer
