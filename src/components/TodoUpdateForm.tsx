import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import useInputs from '../hook/useInputs'
import { TodoDataIDType } from '../type/type'
import TodoDetailForm from './TodoDetailForm'

type TodoUpdateFormProps = {
  selectedItem: TodoDataIDType
  updateTodo: (value: TodoDataIDType) =>  void
}

function TodoUpdateForm({selectedItem, updateTodo}: TodoUpdateFormProps) {
  const { title: initialTitle, description: initialDescription } = selectedItem
  const { history } = useReactRouter()

  const initialState = {
    title: initialTitle,
    description: initialDescription
  }

  const [form, onChange, reset] = useInputs(initialState)
  const {title} = form
  const [description, setDescription] = useState(initialDescription)

  const goHome = ():void => {
    history.push('/')
  }

  const updateNote = (description: string) => {
    console.log('description', description)
    setDescription(description)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  const handlePress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (/^\s*$/.test(title)) {
      reset()
      return
    }
    if (window.confirm('Are you sure you wish to update this item?')) {
      updateTodo({
        ...selectedItem,
        title: title.trim(),
        description: description.trim()
      })
      goHome()
      reset()
    }
  }

  const handleCancel = () => {
    if (window.confirm('Are you sure to cancel?')) {
      goHome()
    }
  }

  return (
    <section>
      <div className="form" onSubmit={handleSubmit}>
        <form action="/update" method="post">
          <div className="form-wrap">
            <input
              className="form__element"
              name="title"
              type="text"
              placeholder="Write a new todo"
              value={title}
              onChange={handleChange}
              onKeyPress={handlePress}
            />
          </div>
          <TodoDetailForm selectedItem={selectedItem} updateNote={updateNote} />
          <div className="button-area">
            <button
              type="button"
              className="button-base button-base--cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-base"
              >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

TodoUpdateForm.defaultProps = {
  updateTodo: () => {}
}

export default TodoUpdateForm
