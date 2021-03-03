import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TodoForm from '../components/TodoForm'
import { useTodoState, useTodoDispatch, getTodoItem, putTodo } from '../context/TodoContext'
import { TodoListType } from '../type/type'
import Loader from 'react-loader-spinner'
import NotFound from '../components/NotFound'

function TodoUpdate() {
  const state = useTodoState()
  const dispatch = useTodoDispatch()
  const { isLoading, data: todoItem, error} = state.item
  const { itemId } = useParams<{ itemId: string }>()

  const updateTodo = (updateItem: TodoListType) => {
    putTodo(dispatch, updateItem)
  }

  useEffect(() => {
    getTodoItem(dispatch, Number(itemId))
  }, [dispatch, itemId])

  if (error) return <NotFound />

  return (
    <>
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      { isLoading ?
        <div className="loading">
          <Loader
            height={100}
            timeout={3000}
            type="Circles"
            visible={true}
            width={80}
          />
        </div> : null
      }
      { todoItem && <TodoForm selectedItem={todoItem} updateTodo={updateTodo} /> }
    </>
  )
}

export default TodoUpdate
