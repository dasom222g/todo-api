import React from 'react'
import useInputs from '../hook/useInputs'
import { FormType } from '../type/type'

// type TodoFormProps = {

// }

const initialState = {
  title: ''
}

type TodoFormProps = {
  addTodo: (value: FormType) => void
}

function TodoForm({addTodo}: TodoFormProps) {
  const [form, onChange, reset] = useInputs<FormType>(initialState)
  const {title} = form

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    addTodo(form)
    reset()
  }
  return (
    <section>
      <div className="form" onSubmit={handleSubmit}>
        <form action="/create" method="post">
          <div className="form-wrap">
            <input
              className="form__element"
              id="title"
              name="title"
              type="title"
              placeholder="Write a new todo"
              value={title}
              onChange={onChange}
            />
            <button
              className="form__button"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default TodoForm
