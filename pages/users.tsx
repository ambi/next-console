import Users from '../components/users'
import { queryUsersList } from '../queries/users'

export default function UsersPage() {
  const { isLoading, isError, data } = queryUsersList()

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>failed to load</div>

  return <Users data={data} />
}
