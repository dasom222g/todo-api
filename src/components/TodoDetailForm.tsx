import React from 'react'
import useInputs from '../hook/useInputs'
import { FormType, TodoListType } from '../type/type'

type TodoDetailFormProps = {
  selectedItem: TodoListType
  updateNote: (value: FormType) => void
}


function TodoDetailForm({selectedItem, updateNote}: TodoDetailFormProps) {
  const initialState = {
    title: selectedItem.title,
    description: selectedItem.description
  }
  const [form, onChange] = useInputs<FormType>(initialState)
  const {description} = form

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e)
    updateNote(form)
  }

  return (
    <div className="todo__detail-desc">
      <textarea
        placeholder="Write a note.."
        name="description"
        value={description}
        onChange={handleChange}
      ></textarea>
    </div>
  )
}

export default TodoDetailForm
