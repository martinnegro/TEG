import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const NoSession = () => {
    const router = useRouter();
    
    useEffect(() => {
        setTimeout(() => router.push('/'),5000)
    },[])
   
    return (
        <div>No Session</div>
    )
}

export default NoSession