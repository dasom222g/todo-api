import React from 'react'
import useInputs from '../../../hook/useInputs'
import { TodoItemType } from '../modules/todos'

type TodoItemProps = {
  todo: TodoItemType
  onCompleteTodo: (id: number) => void
}

const TodoItem = React.memo(({ todo, onCompleteTodo}: TodoItemProps) => {
  console.log('TodoItem render')
  return (
    <li
      style={{
        textDecoration: todo.isComplete ? 'line-through' : 'none'
      }}
      onClick={() => onCompleteTodo(todo.id)}
    >
      { todo.title }
    </li>
  )
})

type TodoListProps = {
  todos: TodoItemType[]
  onCompleteTodo: (id: number) => void
}

const TodoList = React.memo(({ todos, onCompleteTodo}: TodoListProps) => {
  console.log('todoList render')
  return (
    <ul>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} />)}
    </ul>
  )
})

type TodosProps = {
  todos: TodoItemType[]
  onAddTodo: (title: string) => void
  onCompleteTodo: (id: number) => void
}

function Todos({ todos, onAddTodo, onCompleteTodo}: TodosProps) {
  console.log('todos render')
  const initialState = {
    title: ''
  }

  const [form, onChange, reset] = useInputs(initialState)
  const { title } = form

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAddTodo(title)
    reset()
  }

  return (
    <div>
      <form action="/create" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
        />
        <button>등록</button>
      </form>
      <TodoList todos={todos} onCompleteTodo={onCompleteTodo} />
    </div>
  )
}

export default React.memo(Todos)
