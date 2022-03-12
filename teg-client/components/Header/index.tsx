import React from 'react';
import { Nav } from 'react-bootstrap';
import { signOut, useSession } from 'next-auth/react'

import style from './Header.module.css';

function Header() {

    const { data: session, status } = useSession()

    console.log(status)

    return (
        <header className={style.container}>
            <Nav defaultActiveKey="/home" as="ul" className="justify-content-end">
                <Nav.Item as="li">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="profile" href={`/player`}>{session.user.alias || session.user.name || session.user.email}</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" onClick={() => signOut({ callbackUrl: '/' })}>
                    <Nav.Link eventKey="signout">SignOut</Nav.Link>
                </Nav.Item>
            </Nav>
        </header>
    )
}

export default Header