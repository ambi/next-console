import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { UserType } from '../types/user'
import { mutateUser } from '../queries/users'

export default function User({ data }: { data: UserType }) {
  const [invisible, setInvisible] = useState(true)
  const { mutate } = mutateUser()
  const { register, handleSubmit, formState } = useForm({ mode: 'onChange' })

  const submitUser = (user: UserType) => {
    mutate({ ...user, id: data.id })

    setInvisible(false)
    setTimeout(() => setInvisible(true), 3000)
  }

  return (
    <form onSubmit={handleSubmit(submitUser)}>
      <div className="field">
        <label className="label">ID</label>
        <div className="control">
          <input name="id" className="input" type="text" defaultValue={data.id} disabled />
        </div>
      </div>

      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input name="name" className="input" type="text" placeholder="Name" defaultValue={data.name} ref={register({ required: true, maxLength: 255 })} />
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input name="email" className="input" type="email" placeholder="Email" defaultValue={data.email} ref={register({ required: true, maxLength: 255 })} />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <Link href="/users">
            <a className="button is-default">Back</a>
          </Link>
        </div>
        <div className="control">
          <input className="button is-link" type="submit" value="Update" disabled={!formState.isValid} />
        </div>
      </div>

      <div className={'notification is-primary is-light' + (invisible ? ' is-hidden' : '')}>
        Updated the user ({data.name}).
      </div>
    </form>
  )
}
