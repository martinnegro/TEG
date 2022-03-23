import React, { useEffect, useState } from 'react';
import { Table, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import PopoverJoinGame from './PopoverJoinGame'

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
  },[]);

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
        {games.map( game => (
          <tr key={game.id}>
            <td>{game.alias}</td>
            <td>{game.creator.alias || game.creator.name }</td>
            <td>{game.users_game?.length}</td>
            <td>{game.max_players}</td>
            <td>
              <OverlayTrigger  
                show={showPopover[game.id]} 
                trigger='click' 
                placement='top' 
                overlay={<Popover><PopoverJoinGame id_game={game.id}/></Popover>}
              >
                <Button 
                  style={{ width: '100%' }}
                  onClick={handleShowPopover(game.id)}
                  variant={ showPopover[game.id] ? 'danger' : 'primary' }
                >
                  {
                    showPopover[game.id] ? 'Cancelar' : 'Unirse'
                  }
                </Button>
              </OverlayTrigger>
            </td>
          </tr> 
        ))}
        </tbody>
      </Table>
  )
}

export default TableAvailableGames

