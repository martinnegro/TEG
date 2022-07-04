import React, { useState } from 'react'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import ColorSelect from '../CreateGame/ColorSelect';

import { useRouter } from 'next/router'
import { ColorSelectContainer } from 'components/styledComponents/accordion.scss';

const PopoverJoinGame = ({ gameId }) => {
  const [ colorId, setColorId ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ error, setError ] = useState(false);

  const router =  useRouter();

  const joinGame = () => {
      setLoading(true)
      if (!colorId) return;
      axios.post('/api/game/join-game',{ gameId, colorId })
      .then((response) => {
        console.log(response.data)
        setLoading(false);
        setSuccess(true);
        setTimeout(() => router.push(`/game/${response.data.gameId}`),1000)
      })
      .catch((err) => {
        setLoading(false);
        setError(true)
      })
  }  

  return (
    <>
        <Popover.Header style={{ color: '#231f20' }} >Elije tu color</Popover.Header>
        <Popover.Body
          style={{
            width: "400px",
            display: 'flex',
            gap: '10px'
          }}
        >
            <Button 
              size="sm"
              disabled={colorId ? false : true}
              variant={ success ? 'success' : error ? 'danger' : 'primary'}
              onClick={joinGame}
              style={{ minWidth: "4rem" }}
            >{ loading ? <Spinner animation='border' size='sm' /> : success ? 'Listo!' : error ? 'Error :(' : 'Ok' }</Button>
            <ColorSelectContainer>
              <ColorSelect colorSetter={setColorId} gameId={gameId}/>
            </ColorSelectContainer>
        </Popover.Body>
    </>
  )
};

export default PopoverJoinGame