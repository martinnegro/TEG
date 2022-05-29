import { HomeTitle } from 'components/styledComponents/home.scss'
import React from 'react'
import AuthProvidersButtons from './AuthProvidersButtons'

const NoLogged = () => {
    return (
        <>  
            <HomeTitle>
                T.E.G.
            </HomeTitle>
            <AuthProvidersButtons />
        </>
    )
}

export default NoLogged