import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import style from '../styles/index.module.css'

import { useSession, signIn, signOut, getProviders, getSession } from 'next-auth/react';
import { Button } from 'react-bootstrap';

export default function Home({ providers }) {

  const { data: session, status } = useSession();

  return (
    <Layout home width='80%'>
      <Head>
        <title>T.E.G</title>
        <meta name="T.E.G." content="TEG Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className={style.container}>
        <h1 >
          T.E.G.
        </h1>
        {
          session ? 
          <>
            <p>
              Hola {session.user.name}!
            </p>
            <h2>
              <Link href="/player">
                <a>Entrar</a>
              </Link>
            </h2>
            <Button onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
          
          : 
          <Button onClick={() => signIn(providers.google.id,{
            callbackUrl: '/player'
          })}>
            Ingresa con {providers.google.name}
          </Button>
        }

        </div>
    </Layout>
  )
}

Home.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await (getSession({req}));

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/player"
    });
    res.end();
    return;
  } else {
    return {
      session: undefined,
      providers: await getProviders()
    }
  }
};