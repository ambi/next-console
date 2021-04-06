import { GroupType } from '../types/group'
import Link from 'next/link'

export default function Groups({ data }: { data: GroupType[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map(group =>
          <tr key={group.id}>
            <td>{group.id}</td>
            <td><Link href={`/groups/${group.id}`}><a>{group.name}</a></Link></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
