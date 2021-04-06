import Groups from '../components/groups'
import { queryGroupsList } from '../queries/groups'

export default function GroupsPage() {
  const { isLoading, isError, data } = queryGroupsList()

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>failed to load</div>

  return <Groups data={data} />
}
