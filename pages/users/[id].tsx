import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import User from '../../components/user'
import { queryUserByID } from '../../queries/users'

export default function UserPage() {
  const router = useRouter()
  var { id } = router.query
  const { isLoading, isError, data } = queryUserByID(id)

  if (isLoading) return <Layout><div>loading...</div></Layout>
  if (isError) return <Layout><div>failed to load</div></Layout>

  return <User data={data} />
}
