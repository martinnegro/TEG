import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import JoinGameButton from './JoinGameButton';

interface TableAvailableGamesProps {
    games: GameJson[],
}

const TableAvailableGames = ({ games }: TableAvailableGamesProps)  => {
  const [ showPopover, setShowPopover ] = useState<object>({})

  useEffect(() => {
    const objState = games.reduce((prev,game) => {
      prev[game.id] = false
      return prev
    },{})
    setShowPopover(objState);
  },[games]);

  const handleShowPopover = (id_game: string) => {
    return () => setShowPopover(state => {
      return {
        ...state,
        [id_game]: !state[id_game]
      }
    })
  };


  return (
    <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Partida</th>
            <th>Creador</th>
            <th>Jugadores</th>
            <th>Máx. Jugadores</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          games.map( game => (
            <tr key={game.id}>
              <td>{game.alias}</td>
              <td>{game.creator.alias || game.creator.name }</td>
              <td>{game.users_game?.length}</td>
              <td>{game.max_players}</td>
              <td>
                <JoinGameButton 
                  showPopover={showPopover[game.id]}
                  handleShowPopover={handleShowPopover}
                  GAME_ID={game.id}
                />
              </td>
            </tr> 
          ))
        }
        </tbody>
      </Table>
  )
}

export default TableAvailableGames

