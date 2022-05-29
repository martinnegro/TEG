import useLoadFetch from 'hooks/useLoadFetch';
import React from 'react'
import Button from 'react-bootstrap/Button';
import { signIn } from 'next-auth/react';
import { ProvidersContainer } from 'components/styledComponents/home.scss';

const AuthProvidersButtons = () => {
    const [ providers, status, error ] = useLoadFetch('/api/get-provider')
    
    return (
        <ProvidersContainer>
        {
            providers &&
            <Button 
                onClick={() => signIn(providers?.providers.google.id)}
            >
                Ingresa con { providers?.providers.google.name }
            </Button>
        }
        </ProvidersContainer>
    )
}

export default AuthProvidersButtons