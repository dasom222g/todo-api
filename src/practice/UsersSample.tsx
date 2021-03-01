import React, { useState } from 'react'
// import useAsync from '../hook/useAsync'
// import { header } from '../variable/variable'
import { useUsersState, useUsersDispatch, getUsers } from './UserContextSample'
import UserItem from './UserItemSample'

//useAsync 관련 소스
// const getUsers = async() => {
//   const response = await fetch('/api/get-todos', header)
//   let responseData = await response.json()
//   return responseData
//   // responseData = typeof responseData === 'string' ? JSON.parse(responseData) : responseData
// }

function UsersSample() {
  //useAsync 관련 소스
  // const [state, refetch] = useAsync(getUsers, [], true)
  // const {isLoading, data, error} = state
  const state = useUsersState()
  const dispatch = useUsersDispatch()
  const { isLoading, data, error } = state.users
  const [userId, setUserId] = useState<number | null>(null)

  const fetchData = () => {
    getUsers(dispatch)
  }
  
  if (isLoading) return <div>loading...</div>
  if (error) return <div>error..</div>
  if (!data) return <button type="button" onClick={fetchData}>불러오기</button>
  // if (!users) return null
  const users = [...data]

  return (
    <>
      <ul>
        {users.map(item => {
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => 
                  {
                    setUserId(item.id)
                  }
                }
              >
                {item.title}
              </button>
            </li>
          )
        })}
      </ul>
      <button type="button" onClick={fetchData}>다시 불러오기</button>
      {userId && <UserItem id={userId} />}
    </>
  )
}

export default UsersSample
