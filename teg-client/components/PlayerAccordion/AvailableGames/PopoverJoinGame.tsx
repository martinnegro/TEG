import React, { useState } from 'react'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import ColorSelect from '../CreateGame/ColorSelect';

import { useRouter } from 'next/router'


interface Props {
    id_game: string
}

const PopoverJoinGame = ({ id_game }) => {
  const [ id_color, setIdColor ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ error, setError ] = useState(false);

  const router =  useRouter();

  const joinGame = () => {
      setLoading(true)
      axios.post('/api/game/join-game',{ id_game, id_color })
      .then(({ data }) => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => router.push(`/game/${id_game}`),1000)
      })
      .catch((err) => {
        setLoading(false);
        setError(true)
      })
    
  }  

  return (
    <>
        <Popover.Header>Elije tu color</Popover.Header>
        <Popover.Body>
            <ColorSelect colorSetter={setIdColor} id_game={id_game}/>
            <Button 
              size="sm"
              disabled={id_color ? false : true}
              variant={ success ? 'success' : error ? 'danger' : 'primary'}
              onClick={joinGame}
            >{ loading ? <Spinner animation='border' size='sm' /> : success ? 'Listo!' : error ? 'Error :(' : 'Ok' }</Button>
        </Popover.Body>
    </>
  )
};

export default PopoverJoinGame