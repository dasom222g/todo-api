import { header } from '../variable/variable'

export async function getUsers (): Promise<any> {
  const response = await fetch('/api/get-todos', header)
  let responseData = await response.json()
  return responseData
}

export async function getUser (id: number): Promise<any> {
  const response = await fetch(`/api/get-todos/${id}`, header)
  let responseData = await response.json()
  return responseData
}
