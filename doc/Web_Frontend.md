# [State of JS](https://2020.stateofjs.com/en-US/)

- [JavaScript Flavors](https://2020.stateofjs.com/en-US/technologies/javascript-flavors/)
  - JavaScript に変換される言語利用について。
  - 2017年から TypeScript 一強。
  - 続く PureScript, Reason, Elm, ClojureScript は関数型言語。
  - 生の JavaScript をそのまま使っているケースとの比較がないのが気になる。
- [Front-end Frameworks](https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/)
  - フロントエンドフレームワーク。
  - Usage は、React, Angular, Vue.js が続く。Angular は Satisfaction が低い。
  - Satisfaction, Interest は Svelte が１位になっている。ただ Usage は（まだ）低くて、新鋭。
- [Data Layer](https://2020.stateofjs.com/en-US/technologies/datalayer/)
  - Usage では Redux がずっと１位。メジャーなフロントエンドライブラリである React を使う上で重要技術だから。ただし Satisfaction は高くない。
  - GraphQL が強い。通常の REST API との比較がないのが気になる。
- [Back-end Frameworks](https://2020.stateofjs.com/en-US/technologies/back-end-frameworks/)
  - バックエンドフレームワーク。ただし Next.js や Nuxt は、バックエンドを含みうるだけで、必ずしもバックエンドフレームワークではない。
  - Usage では Express.js が一強。これは Web アプリケーションフレームワークなので、今回は無視してよい。
  - 続いて Next.js。Satisfaction では１位。これは React を用いたフレームワーク。
- [Testing](https://2020.stateofjs.com/en-US/technologies/testing/)
  - テストライブラリ。
  - テストフレームワークとしては Jest が一番。
  - Satisfaction １位として Testing Library が躍り出ているが、これは UI 用のテストライブラリであり、Jest のようなテストフレームワークと共存して使う。React であれば react-testing-library。
- [Build Tools](https://2020.stateofjs.com/en-US/technologies/build-tools/)
  - ビルドツール。
  - Usage では webpack が１位。
  - Satisfaction では esbuild, Snowbuild が１位に躍り出ているが、どちらも新鋭で Usage は（まだ）低い。
  - TypeScript も高いが、TypeScript はビルドツール……？
- [Mobile & Desktop](https://2020.stateofjs.com/en-US/technologies/mobile-desktop/)
  - Electron, React Native が強い。
- [Other Tools](https://2020.stateofjs.com/en-US/other-tools/)
  - HTTP クライアントライブラリ axios、ユーティリティライブラリ Lodash が強い。

# React

## ルーティングを設定する

React.js 単体ではルーティングの機能はない。[React Router](https://reactrouter.com/) ライブラリか、[Next.js](https://nextjs.org/) フレームワークを使うことになる。

Next.js の場合、ファイルベースのルーティングなので、簡単に `pages` ディレクトリ配下にルーティングさせたいファイル名作る。

`pages/users.tsx`:
``` tsx
export default function UsersPage() {
  return (
    <Layout>
      <Users users={users} />
    </Layout>
  )
}
```

## HTML テンプレートを書く

`components/users.tsx`:
``` tsx
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
```

## コントローラを書く

API を叩くためには、[React Query](https://react-query.tanstack.com/) または [SWR](https://swr.vercel.app/) を使うと便利。

`pages/users.tsx`:
``` tsx
import Users from '../components/users'
import { useQuery } from 'react-query'

function queryUsersList() {
  return useQuery('/api/users', async () => {
    const res = await fetch('/api/users')
    return res.json()
  })
}

export default function UsersPage() {
  const { isLoading, isError, data } = queryUsersList()

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>failed to load</div>

  return <Users data={data} />
}
```

## HTML フォームの操作を書く

HTML フォームの操作やバリデーションを行うためには、[React Hook Form](https://react-hook-form.com/) を使うと便利。

`components/user.tsx`:
``` tsx
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
```

## API を書く

Next.js では API も用意できる。本来的な使い方でないが、足元での API モックとしても使える。

`pages/api/users.ts`:
``` tsx
import { NextApiRequest, NextApiResponse } from 'next'

const usersData = [
  {
    "id": "1",
    "name": "John Doe",
    "email": "johndoe@example.com"
  },
  {
    "id": "2",
    "name": "Jane Doe",
    "email": "janedoe@example.com"
  }
]

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getHandler(req, res)
      break
    default:
      res.status(405)
      break
  }
}

function getHandler(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200
  res.json(usersData)
}
```
