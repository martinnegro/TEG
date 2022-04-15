import Head from 'next/head'
import Layout from '../components/Layout/layout'
import style from '../styles/index.module.css'

import { useSession, getProviders, getSession } from 'next-auth/react';
import NoLogged from '../components/Index/NoLogged';
import Logged from '../components/Index/Logged';

export default function Home({ providers }) {

  const { data: session } = useSession();

  return (
    <Layout home width='80%'>
      
        <div className={style.container}>
        <h1 >
          T.E.G.
        </h1>
        {
          session ? 
          <NoLogged session={session} />
          : 
          <Logged providers={providers} />
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