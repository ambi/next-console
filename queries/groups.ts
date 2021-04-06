import { useQueryClient, useMutation, useQuery } from 'react-query'
import { GroupType } from '../types/group'

export function queryGroupsList() {
  return useQuery('/api/groups', async () => {
    const res = await fetch('/api/groups')
    return res.json()
  })
}

export function queryGroupByID(id: string | string[] | undefined) {
  return useQuery(['/api/groups', id], async () => {
    const res = await fetch(`/api/groups/${id}`)
    return res.json()
  })
}

export function mutateGroup() {
  const queryClient = useQueryClient()
  const mutationOptions = {
    onSuccess: () => { queryClient.invalidateQueries('/api/groups') }
  }

  return useMutation(async (group: GroupType) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(group),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }
    const res = await fetch(`/api/groups/${group.id}`, options)
    return res.json()
  }, mutationOptions)
}
