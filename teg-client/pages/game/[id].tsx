import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import GameDisplay from '../../components/Game'
import { GameContext, GameContextValues } from 'contexts/GameContext';

export default function Game() {
    const router = useRouter();
    const { status } = useSession({
      required: true,
      onUnauthenticated() { router.push('/') }
    });
    const { fetchGame, game } = useContext(GameContext) as GameContextValues;

    const { id } = router.query;
    
    useEffect(() => {
      if (!fetchGame || !id) return 
      fetchGame(id)
    },[id])
    
    if (typeof window !== undefined && status === 'loading') return <h1>Loading...</h1>
    if (!id) return <h1>No ID!!</h1>

    return (
      <Layout home={false}>
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
