import React from 'react';

import Layout from '../../components/Layout/layout';
import AccessDenied from '../../components/accessDenied';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import style from '../../styles/player/player.module.css'
import PlayerAccordion from '../../components/PlayerAccordion/PlayerAccordion';

function Player() {

    const { data: session, status } = useSession()
    const router = useRouter()

    if (typeof window !== undefined && status === 'loading') return (<p>Cargando...</p>);
    if (!session) return router.push('/')

    return (
        <Layout home={false} width="80%">
            <div className={style.container}>
                <h1>{session && session.user.alias || session.user.name}</h1>
                <PlayerAccordion />
            </div>
        </Layout>
    )
}

export default Player;