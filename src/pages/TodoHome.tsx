import React, {useEffect} from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { deleteTodo, getTodoList, postTodo, putTodo, useTodoDispatch, useTodoState } from '../context/TodoContext'
import { FormType, TodoListType } from '../type/type'
import NotFound from '../components/NotFound'

function TodoHome() {
  const state = useTodoState()
  const dispatch = useTodoDispatch()
  const { data: todoList, error} = state.list

  const addTodo = (value: FormType):void => {
    // Todo: TodoForm에서 이미 validation 을 한상태로 value를 보내주기
    if (!value.title || /^\s*$/.test(value.title)) return
    const _todoList = todoList && [...todoList]
    const sameTodo = _todoList?.filter(item=> item.title === value.title)
    if (!sameTodo?.length) {
      const newTodoItem = {
        title: value.title,
        description: value.description,
      }
      postTodo(dispatch, newTodoItem)
    } else {
      console.log('같은 값이 있습니다')
    }
  }

  const completeTodo = (item: TodoListType): void => {
    const completeItem = {
      ...item,
      isComplete: !item.isComplete
    }
    putTodo(dispatch, completeItem)
  }

  const removeTodo = (id: number): void => {
    deleteTodo(dispatch,id)
  }

  useEffect(() => {
    getTodoList(dispatch)
  }, [dispatch])

  if (error) return <NotFound />
  return (
    <>
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      <TodoForm addTodo = {addTodo} />
      
      { todoList ? <TodoList todoList={todoList} completeTodo={completeTodo} removeTodo={removeTodo} /> : null }
    </>
  )
}

export default TodoHome
