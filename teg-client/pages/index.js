import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>T.E.G</title>
        <meta name="T.E.G." content="TEG Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          T.E.G.
        </h1>
        <h2 className={styles.title}>
          <Link href="/ingame/ingame">
            <a>Entrar</a>
          </Link>
        </h2>
        
      </main>


    </div>
  )
}
