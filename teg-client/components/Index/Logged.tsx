import React from 'react';
import { signIn } from 'next-auth/react';
import Button from 'react-bootstrap/Button'

const Logged = ({ providers }) => {
  return (
        <Button onClick={() => signIn(providers.google.id,{
             callbackUrl: '/player'
        })}>
             Ingresa con {providers.google.name}
         </Button>
  )
}

export default Logged