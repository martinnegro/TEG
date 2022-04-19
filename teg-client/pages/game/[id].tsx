import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../components/Layout/layout';
import AccessDenied from '../../components/accessDenied';
import GameDisplay from '../../components/Game'

export default function Game() {
    const { data: session, status } = useSession();
    const [ game, setGame ] = useState<GameJson | null>(null);

    const router = useRouter();
    const { id } = router.query;
    
    useEffect(() => {
      if (!id) return;
      axios.get(`/api/game/${id}`)
      .then(({ data }) => {
        setGame(data)
      })
      .catch((err) => console.log(err));
    },[id])
    
    if (typeof window !== undefined && status === 'loading') return null;
    if (!session) { return <Layout width='80%' home={false}><AccessDenied/></Layout> }
    if (!id) return <h1>Loading...</h1>

    return (
      <Layout width='100%' home={false}>
        {
          game ? 
          (
            <GameDisplay game={game}/>
          ):
          null
        }
      </Layout>
    )
}
