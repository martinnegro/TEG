import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/layout';
import AccessDenied from '../../components/accessDenied';
import GameDisplay from '../../components/Game'
import { GameContext, GameContextValues } from 'components/contexts/GameContext';

export default function Game() {
    const { data: session, status } = useSession();
    const { fetchGame, game } = useContext(GameContext) as GameContextValues;

    const router = useRouter();
    const { id } = router.query;
    
    useEffect(() => {
      if (!fetchGame || !id) return 
      fetchGame(id)
    },[id])
    
    if (typeof window !== undefined && status === 'loading') return null;
    if (!session) { return <Layout width='80%' home={false}><AccessDenied/></Layout> }
    if (!id) return <h1>Loading...</h1>

    return (
      <Layout width='100%' home={false}>
        {
          game ? 
          (
            <GameDisplay />
          ):
          null
        }
      </Layout>
    )
}
