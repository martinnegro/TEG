import React from 'react';

import Layout from '../../components/Layout/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import style from '../../styles/player/player.module.css'
import PlayerAccordion from '../../components/PlayerAccordion/PlayerAccordion';

function Player() {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() { router.push('/') } 
    })

    if (typeof window !== undefined && status === 'loading') return (<p>Cargando...</p>);

    return (
        <Layout home={false} >
            <div className={style.container}>
                <h1>{session.user.alias || session.user.name}</h1>
                <PlayerAccordion />
            </div>
        </Layout>
    )
}

export default Player;