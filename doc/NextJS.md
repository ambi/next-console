---
title: "Next.js"
date: 2020-06-29T02:04:18+09:00
draft: true
tags: [プログラミング]
---

# [Next.js](https://nextjs.org/)

Next.js は "The React Framework for Production" であると公式サイトにある。

> Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.

React 自体は１個のライブラリにすぎないので、それを使おうとするといろいろ準備が必要。しかも TypeScript にしたりサーバサイドレンダリング (SSR) したりすると、さらに用意が必要。そういったことをやってくれるのが Next.js らしい。`create-react-app` のようなもの。実際 `create-next-app` で Next.js アプリケーションを作る。Next.js といえば SSR だが、SSR を使わないような場合でも Next.js は使うものなのだろうか？

# [Learn Next.js](https://nextjs.org/learn/)

## 1 [Create a Next.js App](https://nextjs.org/learn/basics/create-nextjs-app)

React でウェブアプリケーションを一から作るには、考えなければいけない重要なポイントがたくさんある：

- コードは、webpack のようなバンドラを使ってバンドルして、Babel のようなコンパイラを使って変換する。
- コードスプリットのようなプロダクション用の最適化をする。
- パフォーマンスと SEO のため、一部のページを静的にプリレンダリングしたい。サーバサイドレンダリングとクライアントサイドレンダリングも使いたい。
- React アプリケーションをデータストアにつなげるサーバサイドコードを書きたい。

React フレームワークである Next.js は上の問題すべてを解決する。

Next.js は次のような機能を持つ：

- 直感的なページベースのルーティングシステム。
- プリレンダリング。スタティックジェネレーションとサーバサイドレンダリングの両方を、ページごとにサポートする。
- 自動のコードスプリット。
- プリフェッチつきのクライアントサイドルーティング。
- ビルトインの CSS、SASS、CSS-in-JS サポート。
- Fast Refresh をサポートした開発環境。
- Serverless Functions の API エンドポイントを作るための API ルート。
- 完全に拡張可能。

実際に Next.js アプリケーションを作成する：

``` shell
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"

cd nextjs-blog
```

開発サーバを動かす：
``` shell
npm run dev
```

http://localhost:3000/ をブラウザで開くと、Next.js アプリケーションが開かれる。

`pages/index.js` をエディタで開いて変更して保存すると、自動でブラウザ側も更新される。

## 2 [Navigate Between Pages](https://nextjs.org/learn/basics/navigate-between-pages)

`pages` ディレクトリの下に `posts/first-post.js` ファイルを作る：
``` javascript
export default function FirstPost() {
  return <h1>First Post</h1>
}
```

http://localhost:3000/posts/first-post でページが開かれる。

`next/link` からインポートできる `Link` コンポーネントを使って、`<a>` タグをラップすることで、Next.js アプリケーションのページへのリンクを作ることができる。

``` javascript
import Link from 'next/link'

export default function Home() {
  return (
    //  ...
    <Link href="/posts/first-post">
      <a>this page!</a>
    </Link>
    // ...
  )
}
```

Note: これ、ふと思ったんだけど、`<a>` タグで囲まないといけない理由が分からなかった。勝手に置き換えたりしてくれないのかな？　意図的としか思えないので理由があるんだろうけど。

## 3 [Assets, Metadata, and CSS](https://nextjs.org/learn/basics/assets-metadata-css)

Next.js は `pubic` ディレクトリの下に画像などの静的ファイルを配置することができる。

Next.js で `<head>` タグを書くには、コンポーネント `<Head>` を使う。

Next.js では、styled-js という CSS-in-JS ライブラリを使って、CSS を書く：
``` javascript
<style jsx>{`
...
`}</style>
```

`components` ディレクトリの中に `layout.js` を作って、全ページ共通の `Layout` コンポーネントを作る：
``` javascript
import styles from './layout.module.css' // CSS Modules

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>
}```

`pages/posts/first-post.js`:
``` javascript
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head><title>First Post</title></Head>
      <h1>First Post</h1>
      <h2><Link href="/"><a>Back to home</a></Link></h2>
    </Layout>
  )
}
```

グローバル CSS ファイルをロードするには、`pages/_app.js` ファイルを作る：
``` javascript
import '../styles/global.css' // Global CSS

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

## 4 [Pre-rendering and Data Fetching](https://nextjs.org/learn/basics/data-fetching)

デフォルトでは、Next.js は各ページをプレレンダリングする。つまり、クライアントサイド JavaScript ですべて行う代わりに、前もって各ページの HTML を生成する。

プレレンダリングは２種類ある。Static Generation はビルドタイムに HTML を生成する。Server-side Rendering はリクエストごとに HTML を生成する。開発モード(`npm run dev`)では、Static Generation を使うページでも SSR になる。

ページコンポーネントをエクスポートするとき、`async function getStaticProps()` もエクスポートできる。`getStaticProps()` はビルドタイムで実行されて、関数内で外部データを取得して、props としてページに渡すことができる。

ユーザダッシュボードページのような、プライベートで SEO が関係ないページは、クライアントサイドレンダリングでよい。クライアントサイドでデータを取得するときには、[SWR](https://swr.vercel.app/)を利用することをすすめる。

## [Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes)

`pages/posts/[id].js` でダイナミックルーティングができる。

`async function getStaticPath()` 関数で、`id` の配列を返す。

`async function getStaticProps()` 関数で、必要なデータを取得する。

## [API Routes](https://nextjs.org/learn/basics/api-routes)

`pages/api` ディレクトリの配下に、API エンドポイントを定義できる。

``` javascript
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' })
}
```

DB にデータを保存したり、サードパーティ API と安全に通信したりするときに使うとよい。

## [Deploying Your Next.js App](https://nextjs.org/learn/basics/deploying-nextjs-app)

`npm run build` で `.next` ディレクトリにビルドされる。

## [TypeScript](https://nextjs.org/learn/excel/typescript)

``` shell
touch tsconfig.json
npm install --save-dev typescript @types/react @types/node
```

# [Getting Started](https://nextjs.org/docs/getting-started)

``` shell
npx create-next-app next-app
cd next-app
```

- `npm run dev`: 開発サーバを実行する。
- `npm run build`: プロダクション用にアプリケーションをビルドする。
- `npm start`: プロダクションモードでビルドしたアプリケーションを実行する。

上の３つのコマンドが使えるようになっているので、`next run dev` コマンドで実際に動かしてみると、http://localhost:3000 でアクセスできる。`pages/index.js` を編集すれば即時反映される。

# Basic Features

## [Pages](https://nextjs.org/docs/basic-features/pages)

Next.js の **ページ(page)** は、`pages` ディレクトリの `.js`, `.jsx`, `.ts`, `tsx` ファイルからエクスポートされた React コンポーネントである。

`pages/about.js` というファイルを作ったら、`/about` でアクセスできる。`pages/posts/[id].js` というファイルを作ったら、`posts/1`, `posts/2`, ... でアクセスできる。

デフォルトでは Next.js は全ページをプレレンダリングする。プレレンダリングの形は２つあり、`next build` で HTML をビルド時に生成してリクエストごとに再利用する **Static Generation** と、リクエストごとに HTML を生成する **Server-side Rendering** がある。パフォーマンス的な理由で、Static Generation を推奨する。また、**Client-side Rendering** を使うこともできる。

Static Generation では、ページのコンテンツが外部データに依存する場合、`export async function getStaticProps(context)` を定義して、外部データをページに渡す。ページのパスが外部データに依存する場合、`export async function getStaticPaths()` も定義して、外部データから受け付けるパス一覧を返す。これらの関数はビルド時に呼ばれる。

``` javascript
export default function Post({ post }) {
  // 記事をレンダリングする。
}

// getStaticPaths はビルド時に呼ばれる。
export async function getStaticPaths() {
  // 外部 API エンドポイントを呼んで、記事一覧をフェッチする。
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // 記事一覧に基づいてプレレンダリングするパスを取得する。
  const paths = posts.map((post) => `/posts/${post.id}`)

  // ビルド時にプレレンダリングするパス。fallback: false は、ほかのルーティングは 404 になる。
  return { paths, fallback: false }
}

// getStaticProps はビルド時に呼ばれる。
export async function getStaticProps({ params }) {
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // 記事データを props を通して渡す。
  return { props: { post } }
}
```

Server-side Rendering では、`export async function getServerSideProps()` を定義して、外部データをページに渡す。この関数は、`getStaticProps()` と近いが、リクエストごとにサーバ側で呼ばれる。

``` javascript
export default function Page({ data }) {
  // Render data...
}

// getServerSideProps はリクエストごとに呼ばれる。
export async function getServerSideProps() {
  // 外部 API エンドポイントを呼んで、データをフェッチする。
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // データを props を通して渡す。
  return { props: { data } }
}
```


## [Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)

### `getStaticProps` (Static Generation)

あるページで `export async function getStaticProps` を定義すると、Next.js は `getStaticProps` をビルド時に呼んで返ってきた props を使ってそのページをプレレンダリングする。

``` typescript
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
  return {  props: {} }
}
```

- `context` パラメータ
  - `params`: ダイナミックルーティングのパスパラメータが入る。ページ名が `[id].js` なら、`params` は `{ id: ... }` になる。
  - `preview`
  - `previewData`
  - `locale`
  - `locales`
  - `defaultLocale`
- 返り値
  - `props`: ページコンポーネントに渡す props オブジェクト。
  - `revalidate`
  - `notFound`
  - `redirect`

### `getStaticPaths` (Static Generation)

あるページで `export async function getStaticPaths` を定義すると、Next.js は `getStaticPaths` をビルド時に呼んで返ってきたパス一覧を静的にプレレンダリングする。

``` typescript
import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [ ... ], fallback: false }
}
```

- 返り値
  - `paths`: プレレンダリングさせるパス一覧。
  - `fallback`: `paths` が返さないパスをフォールバックするか、それとも 404 を返すか。

### `getServerSideProps` (Server-side Generation)

あるページで `export async function getServerSideProps` を定義すると、Next.js は `getServerideprops` をリクエストごとに呼んで返ってきた props を使ってそのページをプレレンダリングする。

``` typescript
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} }
}
```

- `context` パラメータ
  - `params`: ダイナミックルーティングのパスパラメータが入る。ページ名が `[id].js` なら、`params` は `{ id: ... }` になる。
  - `req`: [`http.IncomingRequest`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) オブジェクト。
  - `res`: [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) オブジェクト。
  - `query`: クエリ文字列を表すオブジェクト。
  - `preview`
  - `previewData`
  - `resolvedUrl`
  - `locale`
  - `locales`
  - `defaultLocale`
- 返り値
  - `props`: ページコンポーネントに渡す props オブジェクト。
  - `notFound`

### クライアントサイドでのデータフェッチ

クライアントサイドでデータフェッチしたいときには、データフェッチ用の React Hook ライブラリ [SWR](https://swr.vercel.app/) を使うことをすすめる。

``` javascript
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

## [Built-in CSS Support](https://nextjs.org/docs/basic-features/built-in-css-support)

- グローバルスタイルシート
  - CSS をアプリケーション全体に追加したければ、`pages/_app.js` ファイル内で CSS ファイルをインポートする。
- コンポーネントレベルスタイルシート
  - Next.js では、`[name].module.css` というファイル名で [CSS Modules](https://github.com/css-modules/css-modules) をサポートする。CSS Modules は自動でユニークなクラス名を作ることで、スコープを限定する。
- Sass
  - `.scss`, `.sass` 拡張子のファイルにすれば、Sass をインポートできる。あらかじめ `npm install sass` しておく。
- Less, Stylys
  - `less`, `.styl` 拡張子のファイルにすれば、Less, Stylus をインポートできる。`@zeit/next-less`, `@zeit/next-stylus` プラグインを使う。
- CSS-in-JS
  - 様々な CSS-in-JS を使える。

## [Image Component and Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

`next/image` コンポーネントを使って、画像を追加できる。

``` javascript
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Image src="/me.png" alt="Picture of the author" width={500} height={500} />
    </>
  )
}
```

## [Static File Serving](https://nextjs.org/docs/basic-features/static-file-serving)

`public` ディレクトリ下の静的なファイルを提供できる。

## [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh)

Fast Refresh は Next.js でデフォルトで有効になっている機能で、React コンポーネントファイルを編集したときに高速にリフレッシュする。


## [TypeScript](https://nextjs.org/docs/basic-features/typescript)

`touch tsconfig.json` でファイルを作成すると、Next.js は自動でデフォルト設定を構成して、TypeScript に対応する。

## [Environmen Variables](https://nextjs.org/docs/basic-features/environment-variables)

`.env.local` ファイルに環境変数の定義を書くと、`process.env` から参照できる：

``` bash
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

通常、環境変数は Node.js 環境からしか参照できない。`NEXT_PUBLIC_` というプレフィクス付きの環境変数はクライアントサイドでも参照できる。

## [Supported Browsers and Features](https://nextjs.org/docs/basic-features/supported-browsers-features)

Next.js は IE11 と各種モダンブラウザを対応している。

# Routing

## [Introduction](https://nextjs.org/docs/routing/introduction)

Next.js はファイルベースのルーティングを持つ。`pages` ディレクトリ配下にあるファイルは自動でルーティングに組み込まれる。

- `index.js` は自動でそのディレクトリにルーティングされる。
  - `pages/index.js` → `/`
- ネストしたディレクトリ構造はそのままルーティングされる。
  - `pages/blog/first-post.js` → `/blog/first-post`
- ブラケット構文を使うことで、ダイナミックルーティングされる。
  - `pages/blog/[slug].js → `/blog/:slug` (`/blog/hello-world`)
  - `pages/[username]/settings.js` → `/:username/settings` (`/foo/settings`)
  - `pages/post/[...all].js` → `/post/*` (`/post/2020/id/title`)

`Link` コンポーネントを使って、クライアントサイドのルーティング遷移ができる。

``` javascript
import Link from 'next/link'

export default function({ posts }) {
  return (
    <ul>
      <li>
        <Link href="/about"><a>About Us</a></Link>
      </li>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
```

## [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes)

ブラケット構文 `[param]` を使うことでダイナミックルーティングを作れる。

`pages/posts/[pid].js` (`/posts/PID?foo=bar`):
``` javascript
import { useRouter } from 'next/router'

export default function Post() {
  const router = useRouter()
  const { pid, foo } = router.query
  return <p>Post: {pid}, foo: {foo}</p>
}
```

ブラケット内に `...` を追加することで、全パスを配列でキャッチすることができる。たとえば `pages/post/[...slug].js` は `/post/a`, `/post/a/b`, `/post/a/b/c` にマッチする。ダブルブラケット `pages/post/[[...slug]].js` にするとオプショナルになり `/post` にもマッチする。

## [Imperatively](https://nextjs.org/docs/routing/imperatively)

`next/link` で通常のルーティングができるが、これを使わずに `next/router` を使ってクライアントサイドでリンクを作ることもできる。

``` javascript
import { useRouter } from 'next/router'

export default function ReadMore() {
  const router = useRouter()
  return <span onClick={() => router.push('/about')}>Click here to read more</span>
}
```

## [Shallow Routing](https://nextjs.org/docs/routing/shallow-routing)

`getServerSideProps`, `getStaticProps`, `getInitialProps` データフェッチメソッドを呼ばずに URL を変更するには、シャロールーティングを使う。`shallow: true` オプションを付ける。ただし同じページにしか効かない。

``` javascript
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.push('/?counter=10', undefined, { shallow: true }) }, [])
  useEffect(() => { /* the counter changed */ }, [router.query.counter])
}
```

# API Routes

## [Introduction](https://nextjs.org/docs/api-routes/introduction)

`pages/api` ディレクトリ内のファイルは `/api/*` にルーティングされ、API エンドポイントとして扱われる。これはサーバーサイドでのみバンドルされる。API Routes は `next export` とは使えない。

``` javascript
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'John Doe' }))
  }
}
```

- `req`: [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
- `res`: [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)

## [Dynamic API Routes](https://nextjs.org/docs/api-routes/dynamic-api-routes)

API Routes も `pages` と同様にダイナミックルーティングに対応する。

`pages/api/post/[pid].js`:
``` javascript
export default function handler(req, res) {
  const {
    query: { pid },
  } = req
  res.end(`Post: ${pid}`)
}
```

## [API Middlewares](https://nextjs.org/docs/api-routes/api-middlewares)

- `req`: リクエストオブジェクト。
  - `req.cookies`: リクエストが送信している Cookie オブジェクト。デフォルトは `{}`。
  - `req.query`: クエリ文字列のオブジェクト。デフォルトは `{}`。
  - `req.body`: `content-type` でパースするボディのオブジェクト、またはボディがなければ `null`。

ミドルウェアの適切な書き方が、特に書かれていない感じ。

## [Response Helpers](https://nextjs.org/docs/api-routes/response-helpers)

- `res`: レスポンスオブジェクト。
  - `res.status(code: number)`: ステータスコードをセットする。
  - `res.json(json: object)`: JSON レスポンスを返す。
  - `res.send(body: string|object|Buffer)`: HTTP レスポンスを返す。
  - `res.redirect([status=307,] path)`: 特定のパスまたは URL にリダイレクトする。

# Advanced Features

## [Custom `App`](https://nextjs.org/docs/advanced-features/custom-app)

Next.js は `App` コンポーネントをページ初期化に使う。デフォルトの `App` をオーバーライドするには、`pages/_app.js` ファイルを作る。

## [Custom `Document`](https://nextjs.org/docs/advanced-features/custom-document)

カスタム `Document` は `<html>` と `<body>` タグを強化するのに使う。デフォルトの `Document` をオーバーライドするには、`pages/_document.js` ファイルを作成する。

``` javascript
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```


# API Reference

## [CLI](https://nextjs.org/docs/api-reference/cli)

ヘルプ：
```
npx next -h
```

`next build` は、アプリケーションの最適化されたプロダクションビルドを作る。

`next dev` は、ホットコードリロード付きの開発モードでアプリケーションを始める。

`next start` は、プロダクションモードでアプリケーションを始める。先に `next build` しておく。

`next telemetry disable` で、テレメトリ（情報収集）を無効化できる。環境変数 `NEXT_TELEMETRY_DISABLED=1` でもよい。

## [Create Next App](https://nextjs.org/docs/api-reference/create-next-app)

`create-next-app` コマンドで、新しい Next.js アプリケーションを作れる。

## [next/router](https://nextjs.org/docs/api-reference/next/router)

`useRouter()` フックで、router オブジェクトを返す。

- `router` オブジェクト
  - `pathname: string` - 現在のルート。
  - `query: object` - クエリ文字列をパースしたオブジェクト。
  - `asPath: string` - `basePath` や `locale` なしのブラウザ上で見えるパス（クエリ含む）。
  - `isFallback: boolean` - 現在のページがフォールバックモードかどうか。
  - `basePath: string` - アクティブな `basePath`（有効なら）。
  - `locale: string` - アクティブなロケール（有効なら）。
  - `locales: string[]` - サポートしているロケール一覧（有効なら）。
  - `defaultLocale: string` - 現在のデフォルトロケール（有効なら）。
  - `isReady: boolean` - ルータフィールドがクライアントサイドでアップデートされ利用可能かどうか。
  - `push(url: Url, as?: Url, options?: TransitionOptions): Promise<boolean>` - クライアントサイドのナビゲーションを行う。
  - `replace(url: Url, as?: Url, options?: TransitionOptions): Promise<boolean>` - 履歴スタックに追加せず、クライアントサイドのナビゲーションを行う。
  - `prefetch(url: string, asPath?: string, options?: PrefetchOptions): Promise<void>` - 高速なクライアントサイド遷移。
  - `beforePopState(cb: BeforePopStateCallback): void`
  - `back(): void` - 履歴で戻る。`window.history.back()` を行う。
  - `reload(): void` - リロードする。`window.location.reload()` を行う。
  - `events: MittEmitter` - いくつかのルータイベントをリッスンできる。

`withRouter(component)` で、`component` に対してルータオブジェクトを追加で渡すこともできる。

## [next/link](https://nextjs.org/docs/api-reference/next/link)

`Link` コンポーネントで、クライアントサイド遷移が行える。

## [next/image](https://nextjs.org/docs/api-reference/next/image)

`Image` コンポーネントで、画像最適化できる。

## [next/head](https://nextjs.org/docs/api-reference/next/head)

`Head` コンポーネントで、`head` に要素を追加できる。
