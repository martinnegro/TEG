import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/layout';
import GameDisplay from '../../components/Game'
import { GameContext, GameContextValues } from 'contexts/GameContext';

export default function Game() {
    const { data: session, status } = useSession();
    const { fetchGame, game } = useContext(GameContext) as GameContextValues;

    const router = useRouter();
    const { id } = router.query;
    
    useEffect(() => {
      if (!fetchGame || !id) return 
      fetchGame(id)
    },[id])
    
    
    if (typeof window !== undefined && status === 'loading') return <h1>Loading...</h1>
    if (!id) return <h1>No ID!!</h1>

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
