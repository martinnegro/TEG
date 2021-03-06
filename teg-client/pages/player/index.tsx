import React from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout/Layout';
import PlayerAccordion from '../../components/PlayerAccordion/PlayerAccordion';
import { PlayerContainer } from 'components/styledComponents/player.scss';

function Player() {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() { router.push('/') } 
    })

    if (typeof window !== undefined && status === 'loading') return (<p>Cargando...</p>);

    return (
        <Layout home={false}>
            <PlayerContainer>
                <h1>{session.user.alias || session.user.name}</h1>
                <p>En esta sección podrás crear, unirte y acceder a las partidas</p>
                <PlayerAccordion />
            </PlayerContainer>
        </Layout>
    )
}

export default Player;