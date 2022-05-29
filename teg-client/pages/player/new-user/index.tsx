import Link from "next/link";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout/Layout";
import Badge from 'react-bootstrap/Badge';
import NewUserForm from "components/NewUserForm/NewUserForm";
import usePost from "hooks/usePost";

export default function NewUser(){
    const { data: session, status } = useSession()
    const router = useRouter();
    const [ response, statusPost, errorPost, doPost ] = usePost('/api/user/new-user')

    useEffect(() => {
        if (statusPost === 'waiting') return;
        if (statusPost === 'loading') return;
        if (statusPost === 'error') return;
        if (statusPost === 'ok') setTimeout(() => router.push('/player'),2000)
    },[statusPost])
    
    if (typeof window !== undefined && status === 'loading') return (<p>Cargando...</p>);
    if (!session) return router.push('/')

    const sendAlias = (alias: string) =>  {
        doPost({ id: session.id, alias })
    };



    return (
        <Layout home={false}>  
            <h1>Hola <Badge>{ session.user.name || session.user.email }</Badge>!</h1>
            <ul>
                <li>
                    <NewUserForm sendAlias={sendAlias} statusPost={statusPost}/>
                </li>
                <li>
                    O puedes acceder directamente a tu <Link href='/player'>panel</Link> y comenzar a jugar!
                </li>
            </ul>
        </Layout>
    )
}