import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";

export type FetchStatus = 'waiting'|'loading'|'error'|'ok'

const useFetch = <Type>(): [ Type, FetchStatus, Error, Dispatch<SetStateAction<string>> ] => {
    const [ status, setStatus ] = useState<FetchStatus>('waiting')
    const [ data, setData ] = useState<Type | null>(null);
    const [ error, setError ] = useState<Error | null>(null);

    const doFetch = (endpoint: string ) => {
        axios.get(endpoint)
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
    }    

    return [ data, status, error, doFetch ]
};

export default useFetch;