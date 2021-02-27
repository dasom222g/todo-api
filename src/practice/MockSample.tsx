import React, { useEffect, useState, useCallback } from 'react';
import useInputs from '../hook/useInputs';
import { todosType } from '../type/type'

export const MockSample = () => {
  const [ form, onChange, reset ] = useInputs({
    id: 1,
    title: ''
  })

  const { title } = form

  const [todos, setTodos] = useState<todosType>({
    loading: true,
    data: null,
    state:'loading'
  })

  const { data : todoData } = todos

  const fetchData = useCallback(async () => {
    const data = await fetch('/api/get-todos', {
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      }
    })

    let getData = await data.json()
    if (typeof getData === 'string') getData = JSON.parse(getData)

    try {
      setTodos(prev => ({...prev, loading: false, data: getData ? getData : null,  state: 'success'}))
    } catch (e) {
      console.error(e)
      setTodos(prev => ({...prev, loading: false, state: 'error'}))
    }
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (todos) {
      const _todoList = {...todos.data, id: 1, title: title}

      await fetch('/api/post-todos', {
        method: 'POST',
        body: JSON.stringify(_todoList)
      })

      setTodos(prev => ({
        ...prev,
        data: _todoList
      }))
    }
    reset()
  }, [title, todos, reset])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (todoData) {
    return (
      <>
      <div>입력한 텍스트: {todoData.title}</div>
      <div>id {todoData.id}</div>
      </>
    )
  }
  return (
    <div className="wrap">
      <form action="/create" className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
        />
      </form>
    </div>
  )
}

export default MockSample
