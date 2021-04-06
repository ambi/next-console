import './layout.module.css'
import Head from 'next/head'
import Link from "next/link"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>next-console</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head >
      <header>
        <nav className="navbar is-dark">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Accounts</a>
                <div className="navbar-dropdown">
                  <Link href="/users">
                    <a className="navbar-item">Users</a>
                  </Link>
                  <Link href="/groups">
                    <a className="navbar-item">Groups</a>
                  </Link>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">System</a>
                <div className="navbar-dropdown">
                  <Link href="/security">
                    <a className="navbar-item">Security</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        {children}
      </div>
    </div >
  )
}
