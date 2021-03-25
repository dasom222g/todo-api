import { useEffect } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { IRootState, ThunkTodoDispatchType } from '../type/type'
import NotFound from '../components/NotFound'
import { getTodos, postTodo, putTodo, removeTodo as removeThunk } from '../modules/todos'
import { useSelector, useDispatch } from 'react-redux'

function TodoHome() {
  const { items: todos, error } = useSelector((state: IRootState) => state.todos)
  const { allIds, byId } = todos
  const dispatch: ThunkTodoDispatchType = useDispatch()
  const addTodo = (title: string): void => {
    const sameFilter = allIds.filter((id) => byId[id].title === title)
    if (sameFilter.length) return
    dispatch(postTodo(title))
  }

  const completeTodo = (id: string): void => {
    const changeItem = {
      ...byId[id],
      isComplete: !byId[id].isComplete,
    }
    dispatch(putTodo(changeItem))
  }

  const removeTodo = (id: string): void => {
    dispatch(removeThunk(id))
  }

  useEffect(() => {
    // 이미 조회 했던경우에는 다시 api요청 안함
    if (allIds.length) return
    dispatch(getTodos())
    /* eslint-disable-next-line */
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
