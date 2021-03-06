import React, {useEffect} from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { deleteTodo, getTodos, postTodo, putTodo, useTodoDispatch, useTodoState } from '../context/TodoContext'
import { TodoDataType } from '../type/type'
import NotFound from '../components/NotFound'

function TodoHome() {
  const state = useTodoState()
  const dispatch = useTodoDispatch()
  const {data: todoList, error} = state

  const addTodo = (title: string):void => {
    const {allIds, byId} = todoList.items
    const byIdArr = allIds.map(id => byId[id])
    const sameArr = byIdArr.filter(item => item.title === title)
    if (!sameArr.length) {
      const newTodoItem: TodoDataType = {
        title,
        description: '',
        isComplete: false
      }
      postTodo(dispatch, newTodoItem)
    }
  }

  const completeTodo = (id: string): void => {
    const changeItem = {
      ...todoList.items.byId[id],
      isComplete: !todoList.items.byId[id].isComplete
    }
    putTodo(dispatch, changeItem)
  }

  const removeTodo = (id: string): void => {
    // const removeItem = todoList.todos.byId[id]
    deleteTodo(dispatch, id)
  }

  useEffect(() => {
    getTodos(dispatch)
  }, [dispatch])

  if (error) return <NotFound />
  return (
    <>
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      <TodoForm addTodo = {addTodo} />
      {/* { isLoading &&
        (
          <div className="loading">
            <Loader height={100} type="Circles" visible={true} width={80} />
          </div>
        )
      } */}
      { todoList ? <TodoList todoList={todoList} completeTodo={completeTodo} removeTodo={removeTodo} /> : <></> }
    </>
  )
}

export default TodoHome
