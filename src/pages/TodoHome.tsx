import React, {useEffect} from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { getTodoList, postTodoList, useTodoDispatch, useTodoState } from '../context/TodoContext'
import { FormType, TodoListType } from '../type/type'

function TodoHome() {
  const state = useTodoState()
  const dispatch = useTodoDispatch()
  const { isLoading, data: todoList, error} = state.list

  const addTodo = (value: FormType):void => {
    const newTodoItem: TodoListType = {
      id: todoList ? todoList.length + 1 : 1,
      title: value.title,
      description: value.description,
      isComplete: false
    }
    postTodoList(dispatch, todoList ? todoList : [], newTodoItem)
  }

  const completeTodo = (id: number): void => {
    if (todoList) {
      const _todoList = [...todoList]
      const completeTodoList = _todoList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isComplete: !item.isComplete
          }
        }
        return item
      })
      dispatch({type: 'LIST_SUCCESS', data: completeTodoList})
      postTodoList(dispatch, completeTodoList)
    }
  }

  const removeTodo = (id: number): void => {
    if (todoList) {
      let removeList = [...todoList].filter(item => item.id !== id)
      removeList = removeList.map((item, index) => ({
        ...item,
        id: index + 1
      }))
      dispatch({type: 'LIST_SUCCESS', data: removeList})
      postTodoList(dispatch, removeList)
    }
  }

  const selectTodo = (selectedItem: TodoListType) => {
    dispatch({type: 'ITEM_SUCCESS', data: selectedItem})
  }

  useEffect(() => {
    getTodoList(dispatch)
  }, [dispatch])

  if (isLoading) return <div>loading...</div>
  if (error) return <div>error..</div>
  return (
    <>
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      <TodoForm addTodo = {addTodo} />
      {todoList ? <TodoList todoList={todoList} completeTodo={completeTodo} removeTodo={removeTodo} selectTodo={selectTodo}/> : null}
    </>
  )
}

export default TodoHome
