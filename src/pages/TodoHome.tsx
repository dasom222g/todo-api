import React, {useEffect} from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { deleteTodo, getTodoList, postTodo, putTodo, useTodoDispatch, useTodoState } from '../context/TodoContext'
import { FormType, TodoListType } from '../type/type'
import Loader from 'react-loader-spinner'
import NotFound from '../components/NotFound'

function TodoHome() {
  const state = useTodoState()
  const dispatch = useTodoDispatch()
  const { isLoading, data: todoList, error} = state.list

  const addTodo = (value: FormType):void => {
    if (!value.title || /^\s*$/.test(value.title)) return
    const _todoList = todoList && [...todoList]
    const sameTodo = _todoList?.filter(item=> item.title === value.title)
    if (!sameTodo?.length) {
      const newTodoItem: TodoListType = {
        id: Math.floor(Math.random()*99999),
        title: value.title,
        description: value.description,
        isComplete: false
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
      { isLoading ?
        <div className="loading">
          <Loader
            height={100}
            // secondaryColor="#ffffff"
            timeout={3000}
            type="Circles"
            visible={true}
            width={80}
          />
        </div>  : null
      }
      { !isLoading && todoList ? <TodoList todoList={todoList} completeTodo={completeTodo} removeTodo={removeTodo} /> : null }
    </>
  )
}

export default TodoHome
