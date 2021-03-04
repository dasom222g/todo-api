import React, { useEffect } from 'react'
import useInputs from '../hook/useInputs'
import { FormType, TodoDataType } from '../type/type'

type TodoDetailFormProps = {
  selectedItem: TodoDataType
  updateNote: (value: FormType) => void
}


function TodoDetailForm({selectedItem, updateNote}: TodoDetailFormProps) {
  const initialState = {
    title: selectedItem.title,
    description: selectedItem.description
  }
  const [form, onChange] = useInputs<FormType>(initialState)
  const {description} = form

  useEffect(() => {
    updateNote(form)
  }, [updateNote, form])

  return (
    <div className="todo__detail-desc">
      <textarea
        placeholder="Write a note.."
        name="description"
        value={description}
        onChange={onChange}
      ></textarea>
    </div>
  )
}

export default TodoDetailForm
