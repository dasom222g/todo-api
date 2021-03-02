import React, {useEffect} from 'react'
// import useAsync from '../hook/useAsync'
// import { header } from '../variable/variable'
import { getUser, useUsersDispatch, useUsersState } from './UserContextSample'

//useAsync 관련 소스
// const getUser = async(id: number) => {
//   const response = await fetch(`/api/get-data/${id}`, header)
//   let responseData = await response.json()
//   return responseData
//   // responseData = typeof responseData === 'string' ? JSON.parse(responseData) : responseData
// }

type usetItemProps = {
  id: number
}
function UserItemSample({ id }: usetItemProps) {
  // const [state] = useAsync(() => getUser(id), [id])
  // const {isLoading, data, error} = state
  const state = useUsersState()
  const dispatch = useUsersDispatch()
  const {isLoading, data, error} = state.user

  useEffect(() => {
    getUser(dispatch, id)
  }, [dispatch, id])

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error...</div>
  if(!data) return null

  const user = {...data}
  return (
    <div>
      <div>{user.id}</div>
      <div>{user.title}</div>
    </div>
  )
}

export default UserItemSample
