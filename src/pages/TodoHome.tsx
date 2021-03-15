import React, { useEffect } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { ActionType, AsyncTodoType, IRootState } from '../type/type'
import NotFound from '../components/NotFound'
import { getTodos, postTodo } from '../modules/todos'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

type ThunkTodoDispatchType = ThunkDispatch<AsyncTodoType, ActionType, AnyAction>

function TodoHome() {
  const { data: todos, error } = useSelector((state: IRootState) => state.todos)
  const dispatch: ThunkTodoDispatchType = useDispatch()

  const addTodo = (title: string): void => {
    const { allIds, byId } = todos.items
    const sameFilter = allIds.filter((id) => byId[id].title === title)
    if (sameFilter.length) return
    dispatch(postTodo(title))
  }

  const completeTodo = (id: string): void => {
    // putTodo(dispatch, changeItem)
  }

  const removeTodo = (id: string): void => {
    // const removeItem = todoList.todos.byId[id]
    // deleteTodo(dispatch, id)
  }

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  if (error) return <NotFound />
  return (
    <>
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      <TodoForm addTodo={addTodo} />
      {/* { isLoading &&
        (
          <div className="loading">
            <Loader height={100} type="Circles" visible={true} width={80} />
          </div>
        )
      } */}
      <TodoList todoList={todos} completeTodo={completeTodo} removeTodo={removeTodo} />
    </>
  )
}

export default TodoHome
