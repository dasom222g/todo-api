import React, { useEffect } from 'react'
import useInputs from '../hook/useInputs'
import { TodoDataType } from '../type/type'

type TodoDetailFormProps = {
  selectItem: TodoDataType
  updateNote: (value: string) => void
}

function TodoDetailForm({ selectItem, updateNote }: TodoDetailFormProps) {
  const initialState = {
    title: selectItem.title,
    description: selectItem.description ? selectItem.description : '',
  }
  const [form, onChange] = useInputs(initialState)
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
