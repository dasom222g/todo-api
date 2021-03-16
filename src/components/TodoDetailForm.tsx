import React, { useEffect } from 'react'
import useInputs from '../hook/useInputs'
import { FormType, TodoDataType } from '../type/type'

type TodoDetailFormProps = {
  selectedItem: TodoDataType
  updateNote: (value: string) => void
}

function TodoDetailForm({ selectedItem, updateNote }: TodoDetailFormProps) {
  const initialState = {
    title: selectedItem.title,
    description: selectedItem.description,
  }
  const [form, onChange] = useInputs<FormType>(initialState)
  const { description } = form

  useEffect(() => {
    updateNote(description)
    //eslint-disable-next-line
  }, [description])

  return (
    <div className="todo__detail-desc">
      <textarea
        placeholder="Write a note.."
        name="description"
        value={description}
        onChange={onChange}></textarea>
    </div>
  )
}

export default TodoDetailForm
