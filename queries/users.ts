import { useQueryClient, useMutation, useQuery } from 'react-query'
import { UserType } from '../types/user'

export function queryUsersList() {
  return useQuery('/api/users', async () => {
    const res = await fetch('/api/users')
    return res.json()
  })
}

export function queryUserByID(id: string | string[] | undefined) {
  return useQuery(['/api/users', id], async () => {
    const res = await fetch(`/api/users/${id}`)
    return res.json()
  })
}

export function mutateUser() {
  const queryClient = useQueryClient()
  const mutationOptions = {
    onSuccess: () => { queryClient.invalidateQueries('/api/users') }
  }

  return useMutation(async (user: UserType) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }
    const res = await fetch(`/api/users/${user.id}`, options)
    return res.json()
  }, mutationOptions)
}
