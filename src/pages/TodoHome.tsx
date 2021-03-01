import React from 'react'
import TodoForm from '../components/TodoForm'
import { FormType } from '../type/type'

function TodoHome() {
  const addTodo = (value: FormType):void => {
    console.log(value.title)
  }
  return (
    <div>
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      <TodoForm addTodo = {addTodo} />
    </div>
  )
}

export default TodoHome
