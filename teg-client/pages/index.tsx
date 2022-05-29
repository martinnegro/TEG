import Layout from '../components/Layout/Layout';

import { useSession } from 'next-auth/react';
import NoLogged from 'components/Index/NoLogged'
import Logged from 'components/Index/Logged'
export default function Home() {
  const { status } = useSession();

  return (
    <Layout home>
        {
            status === 'loading' 
          ? <h1>Loading</h1>
          : status === 'unauthenticated'
          ? <NoLogged />
          : status === 'authenticated' 
          ? <Logged/>
          : <h1>Error</h1>
        }
    </Layout>
  )
}