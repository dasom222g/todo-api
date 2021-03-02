import React from 'react'
import TodoForm from '../components/TodoForm'
import { useTodoState, useTodoDispatch, postTodoList } from '../context/TodoContext'
import { TodoListType } from '../type/type'

function TodoUpdate() {
  const state = useTodoState()
  const dispatch = useTodoDispatch()
  const {data: todoList} = state.list
  const { isLoading, data: todoItem, error} = state.item

  const updateTodo = (updateItem: TodoListType) => {
    if (todoList) {
      const {title, description} = updateItem
      const _todoList = [...todoList]
      const updateList = _todoList.map(item => {
        if (item.id === updateItem.id) {
          return {
            ...item,
            title,
            description
          }
        }
        return {...item}
      })
      console.log('받은값', updateItem, '가공한 값', updateList)
      dispatch({type: 'LIST_SUCCESS', data: updateList})
      postTodoList(dispatch, updateList)
    }
  }

  if (isLoading) return <div>loading...</div>
  if (error) return <div>error..</div>

  return (
    <>
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      {todoItem &&
        <>
          <TodoForm selectedItem={todoItem} updateTodo={updateTodo} />
        </>
      }
    </>
  )
}

export default TodoUpdate
