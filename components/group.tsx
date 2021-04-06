import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { GroupType } from '../types/group'
import { mutateGroup } from '../queries/groups'

export default function Group({ data }: { data: GroupType }) {
  const [invisible, setInvisible] = useState(true)
  const { mutate } = mutateGroup()
  const { register, handleSubmit } = useForm()

  const submitGroup = (group: GroupType) => {
    mutate({ ...group, id: data.id })

    setInvisible(false)
    setTimeout(() => setInvisible(true), 3000)
  }

  return (
    <form onSubmit={handleSubmit(submitGroup)}>
      <div className="field">
        <label className="label">ID</label>
        <div className="control">
          <input name="id" className="input" type="text" defaultValue={data.id} disabled />
        </div>
      </div>

      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input name="name" className="input" type="text" placeholder="Name" defaultValue={data.name} ref={register} />
        </div>
      </div>

      <div className="field">
        <label className="label">Members</label>
        (members ...)
      </div>

      <div className="field is-grouped">
        <div className="control">
          <Link href="/groups">
            <a className="button is-default">Back</a>
          </Link>
        </div>
        <div className="control">
          <input className="button is-link" type="submit" value="Update" />
        </div>
      </div>

      <div className={'notification is-primary is-light' + (invisible ? ' is-hidden' : '')}>
        Updated the group ({data.name}).
      </div>
    </form>
  )
}
