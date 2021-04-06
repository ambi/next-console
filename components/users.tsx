import { UserType } from '../types/user'
import Link from 'next/link'

export default function Users({ data }: { data: UserType[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map(user =>
          <tr key={user.id}>
            <td>{user.id}</td>
            <td><Link href={`/users/${user.id}`}><a>{user.name}</a></Link></td>
            <td>{user.email}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
