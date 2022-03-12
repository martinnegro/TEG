import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { InputGroup, FormControl, Row, Col, Button, Form } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import useSWR from 'swr';  

import Layout from '../../components/layout';
import Map from '../../components/map'
import AccessDenied from '../../components/accessDenied';
import { useRouter } from 'next/router';



export default function Game() {
    const { data: session, status } = useSession();
    const [ game, setGame ] = useState<GameJson | null>(null);

    if (typeof window !== undefined && status === 'loading') return null;
    if (!session) { return <Layout home={false}><AccessDenied/></Layout> }

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
      axios.get(`/api/game/${id}`)
      .then((response) => {
        console.log(response.data.alias)
        setGame(response.data)
      })
      .catch((err) => console.log(err));
    },[id])

    return (
      <Layout home={false}>
        {
          game ? 
          (
            <h1>{game.alias}</h1>
          ):
          null
        }
      </Layout>
    )
}
