import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from 'axios';
import { Button, Badge, Form, InputGroup } from "react-bootstrap";

import Layout from "../../../components/Layout/layout";
import AccessDenied from "../../../components/accessDenied";

export default function NewUser({}){
    const { data: session, status } = useSession()
    const router = useRouter()

    if (typeof window !== undefined && status === 'loading') return null;
    if (!session) { return <Layout home={false} width="80%"><AccessDenied/></Layout> }

    const sendAlias = async (e) =>  {
        e.preventDefault();
        const response = await axios.post('/api/game/new-user',{ id: session.id, alias: e.target.alias.value });
        router.push('/player');
    };

    return (
        <Layout home={false} width="80%">  
            <h1>Hola <Badge>{session.user.name || session.user.email }</Badge>!</h1>
            <ul>
                <li>
                    <Form
                        onSubmit={(e) => sendAlias(e)}
                    >
                        <Form.Label>Puedes crear un alias para jugar T.E.G.</Form.Label>
                        <InputGroup>
                        <Form.Control 
                            type='text' 
                            placeholder="Máximo 10 caracteres"
                            name="alias"
                        />
                        <Button type="submit">OK</Button>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            Puedes crearlo más adelante
                        </Form.Text>
                    </Form>
                </li>
                <li>
                    O puedes acceder directamente a tu <Link href='/player'>panel</Link> y comenzar a jugar!
                </li>
            </ul>
        </Layout>
    )
}