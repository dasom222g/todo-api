import React from 'react'
import useInputs from '../hook/useInputs'
import { formInitialState, FormType } from '../type/type'

type TodoFormProps = {
  addTodo: (value: string) => void
}

function TodoForm({addTodo}: TodoFormProps) {
  
  const [form, onChange, reset] = useInputs<FormType>(formInitialState)
  const {title} = form

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (/^\s*$/.test(title)) {
      reset()
      return
    }
    // 공백제거
    addTodo(title.trim())
    reset()
  }

  return (
    <section>
      <div className="form" onSubmit={handleSubmit}>
        <form action="/create" method="post">
          <div className="form-wrap">
            <input
              className="form__element"
              name="title"
              type="text"
              placeholder="Write a new todo"
              value={title}
              onChange={handleChange}
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
