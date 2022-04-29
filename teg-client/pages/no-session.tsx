import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const NoSession = () => {
    const router = useRouter();
    const { data: session, status } = useSession()
    
    useEffect(() => {

        

        setTimeout(() => router.push('/'),5000)
    },[])
   
    return (
        <div>No Session</div>
    )
}

export default NoSession