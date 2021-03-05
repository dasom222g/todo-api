import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import useInputs from '../hook/useInputs'
import { formInitialState, FormType, TodoDataIDType } from '../type/type'
import TodoDetailForm from './TodoDetailForm'

type TodoFormProps = {
  selectedItem: TodoDataIDType
  addTodo: (value: FormType) => void
  updateTodo: (value: TodoDataIDType) =>  void
}

function TodoForm({selectedItem, addTodo, updateTodo}: TodoFormProps) {
  const { history } = useReactRouter()

  const selectedInitialState = {
    title: selectedItem?.title,
    description: selectedItem?.description
  }

  const [form, onChange, reset] = useInputs<FormType>(selectedItem ? selectedInitialState :formInitialState)
  const {title} = form
  const [description, setDescription] = useState(selectedItem ? selectedItem.description : '')

  const goHome = ():void => {
    history.push('/')
  }

  const updateNote = (data: FormType) => {
    setDescription(data.description)
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
    if (!selectedItem) {
      addTodo(form)
      reset()
    } else {
      if (window.confirm('Are you sure you wish to update this item?')) {
        updateTodo({...selectedItem, title, description})
        goHome()
        reset()
      }
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
        {!selectedItem ?
          (
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
          ) : (
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
          )
        }
      </div>
    </section>
  )
}

TodoForm.defaultProps = {
  selectedItem: null,
  addTodo: () => {},
  updateTodo: () => {},
}

export default TodoForm
