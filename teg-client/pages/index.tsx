import { useSession } from 'next-auth/react';
import Layout from '../components/Layout/Layout';
import NoLogged from 'components/Index/NoLogged'
import Logged from 'components/Index/Logged'
export default function Home() {
  const { data: session, status } = useSession();

  return (
    <Layout home={!(status === 'authenticated')}>
        {
            status === 'loading' 
          ? <h1>Loading</h1>
          : status === 'unauthenticated'
          ? <NoLogged />
          : status === 'authenticated' 
          ? <Logged session={session}/>
          : <h1>Error</h1>
        }
    </Layout>
  )
}