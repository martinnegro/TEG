import { useEffect, useState } from "react";
import axios from "axios";


export type FetchStatus = 'waiting'|'loading'|'error'|'ok'
export default <Type>(url: string) => {
    const [ status, setStatus ] = useState<FetchStatus>('loading')
    const [ data, setData ] = useState<Type | null>(null);
    const [ error, setError ] = useState<Error | null>(null);

    useEffect(() => {
        axios.get(url)
        .then(({ data }) => {
            setStatus('ok')
            setError(null)
            setData(data)
        })
        .catch((err: Error) => {
            setStatus('error')
            setData(null)
            setError(err)        
        });
    },[]);

    return [ data, status, error ]
};
