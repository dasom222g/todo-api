import React from 'react'
import useAsync from '../hook/useAsync'
import { header } from '../variable/variable'

const getUsers = async() => {
  const response = await fetch('/api/get-todos', header)
  let responseData = await response.json()
  return responseData
  // responseData = typeof responseData === 'string' ? JSON.parse(responseData) : responseData
}

function UsersSample() {
  const [state, refetch] = useAsync(getUsers, [], true)
  const {isLoading, data: users, isError} = state 

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>error..</div>
  if (!users) return <button type="button" onClick={refetch}>불러오기</button>
  // if (!users) return null

  return (
    <>
      <ul>
        {users.map(item => <li key={item.id}>{item.title}</li>)}
      </ul>
      <button type="button" onClick={refetch}>다시 불러오기</button>
    </>
  )
}

export default UsersSample
