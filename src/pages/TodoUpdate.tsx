import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { useTodoState, useTodoDispatch, getTodo, putTodo } from '../context/TodoContext'
import { TodoDataIDType } from '../type/type'
import Loader from 'react-loader-spinner'
import NotFound from '../components/NotFound'
import TodoUpdateForm from '../components/TodoUpdateForm'

function TodoUpdate() {
  // const { isLoading, selectedItem: todoItem, error} = state
  const { itemId } = useParams<{ itemId: string }>()

  const updateTodo = (updateItem: TodoDataIDType) => {
    // putTodo(dispatch, updateItem)
  }

  // if (error) return <NotFound />

  return (
    <>
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      {/* { isLoading &&
        (
          <div className="loading">
            <Loader height={100} timeout={3000} type="Circles" visible={true} width={80} />
          </div>
        )
      }
      { todoItem && <TodoUpdateForm selectedItem={todoItem} updateTodo={updateTodo} /> } */}
    </>
  )
}

export default TodoUpdate
