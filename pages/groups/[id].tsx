import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import Group from '../../components/group'
import { queryGroupByID } from '../../queries/groups'

export default function GroupPage() {
  const router = useRouter()
  var { id } = router.query
  const { isLoading, isError, data } = queryGroupByID(id)

  if (isLoading) return <Layout><div>loading...</div></Layout>
  if (isError) return <Layout><div>failed to load</div></Layout>

  return <Group data={data} />
}
