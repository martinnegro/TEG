import { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";

export type PostStatus = 'waiting' | 'loading'|'error'|'ok'

const usePost = <Type>(endpoint: string  | null): [ Type, PostStatus, Error, Function ] => {
    const [ status, setStatus ] = useState<PostStatus>('waiting')
    const [ response, setResponse ] = useState<Type | null>(null);
    const [ error, setError ] = useState<Error | null>(null);

    const doPost = (body: Object) => {
        setStatus('loading')
        axios.post(endpoint,body)
        .then(({ data }) => {
            setStatus('ok')
            setError(null)
            setResponse(data)
        })
        .catch((err: Error) => {
            setStatus('error')
            setResponse(null)
            setError(err)
            setTimeout(() => setStatus('waiting'),2000)
        });
    }    

    return [ response, status, error, doPost ]
};

export default usePost;