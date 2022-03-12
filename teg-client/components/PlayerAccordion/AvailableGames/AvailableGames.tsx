import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import TableAvailableGames from './TableAvailableGames';

function AvailableGames() {
  const [ games, setGames ] = useState<GameJson[] | null>(null);
  const [ loading, setLoading ] = useState<Boolean>(true);
  const [ error, setError ] = useState({ isError: false, message: '' });

  useEffect(() => {
    setLoading(true)
    axios.get('/api/game/available-games')
    .then(({ data }) => {
      setError({ isError: false, message: '' })
      setGames(data);
      setLoading(false)
    })
    .catch((err) => {
      setError({ isError: true, message: 'Ocurrió un error :(' })
      setLoading(false)
    });
  },[])

 
  return (
    <>
    {
      loading ?
      < Spinner animation="border" />
      : error.isError ?
      <Alert variant='danger'>{error.message}</Alert>
      : games.length === 0 || games === null ?
      <Alert variant='dark'>No hay mesas para inscribirse</Alert>
      : 
      <TableAvailableGames games={games}/>
    }
    </>
  )
}

export default AvailableGames