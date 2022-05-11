import React, { useEffect, useState } from 'react';
import { getProviders, getSession, signIn } from 'next-auth/react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const Logged = () => {
     const [ providers, setProviders ] = useState(null)

     useEffect(() => {
          axios.get('/api/get-provider')
          .then(({ data }) => setProviders(data.providers))
     },[])

     if (!providers) return null;

     return (
          <Button onClick={() => signIn(providers?.google.id,{
               callbackUrl: '/player'
          })}>
               Ingresa con {providers?.google.name}
          </Button>
  )
}

export default Logged