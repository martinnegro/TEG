import React from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

import { signOut } from 'next-auth/react';

const NoLogged = ({ session }) => {
  return (
    <>
            <p>
              Hola {session.user.name}!
            </p>
            <h2>
              <Link href="/player">
                <a>Entrar</a>
              </Link>
            </h2>
            <Button onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
  )
}

export default NoLogged