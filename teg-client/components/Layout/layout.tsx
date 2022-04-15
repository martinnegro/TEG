import Head from 'next/head'
import Link from 'next/link'
import Header from '../Header'

import style from './layout.module.css'

export const siteTitle = 'T.E.G.'

export default function Layout({ children, home, width }) {
  return (
    <div className={style.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>T.E.G.</title>
        <meta
          name="T.E.G."
          content="Juega al T.E.G. online con tus amigos!"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      { !home &&
        <Header />
      }
      <main style={{ width }}>{children}</main>
    </div>
  )
}
