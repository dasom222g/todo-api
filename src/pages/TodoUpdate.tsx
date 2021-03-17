import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { useTodoState, useTodoDispatch, getTodo, putTodo } from '../context/TodoContext'
import { TodoDataIDType, IRootState, ThunkTodoDispatchType } from '../type/type'
import Loader from 'react-loader-spinner'
import NotFound from '../components/NotFound'
import TodoUpdateForm from '../components/TodoUpdateForm'
import { useDispatch, useSelector } from 'react-redux'
import { getTodo, putTodo } from '../modules/todos'

function TodoUpdate() {
  const { isLoading, data: todos, error } = useSelector((state: IRootState) => state.todos)
  const dispatch: ThunkTodoDispatchType = useDispatch()
  const { itemId } = useParams<{ itemId: string }>()
  const selectItem = todos.items.byId[itemId]

  const updateTodo = (updateItem: TodoDataIDType) => {
    dispatch(putTodo(updateItem))
  }

  useEffect(() => {
    // 기존에 선택했던 아이템인 경우 다시 데이터 요청 안하고 loading없이 바로 보여줌
    if (selectItem && selectItem.description !== undefined) return
    dispatch(getTodo(itemId))
    /* eslint-disable-next-line */
  }, [dispatch, itemId])

  if (error) return <NotFound />
  return (
    <>
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      {isLoading && (
        <div className="loading">
          <Loader height={100} timeout={3000} type="Circles" visible={true} width={80} />
        </div>
      )}
      {!isLoading && selectItem && (
        <TodoUpdateForm selectItem={selectItem} updateTodo={updateTodo} />
      )}
    </>
  )
}

export default TodoUpdate
