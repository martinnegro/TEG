import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";

export type FetchStatus = 'loading'|'error'|'ok'

const useFetch = <Type>(endpoint: string  | null): [ Type, FetchStatus, Error, Dispatch<SetStateAction<string>> ] => {
    const [ status, setStatus ] = useState<FetchStatus>('loading')
    const [ url, setUrl ] = useState<string | null>(endpoint)
    const [ data, setData ] = useState<Type | null>(null);
    const [ error, setError ] = useState<Error | null>(null);

    

    useEffect(() => {
      if(!url) return null
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
    },[url]);
    

    return [ data, status, error, setUrl ]
};

export default useFetch;