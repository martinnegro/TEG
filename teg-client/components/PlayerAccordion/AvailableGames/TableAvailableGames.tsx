import { ResponsiveTd, ResponsiveTh, StyledTd } from 'components/styledComponents/table.scss';
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
    <Table bordered hover size="sm">
        <thead>
          <tr>
            <ResponsiveTh>Partida</ResponsiveTh>
            <th>Creador</th>
            <ResponsiveTh>Inscriptos</ResponsiveTh>
            <th>Jugadores</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          games.map( game => (
            <tr key={game.id}>
              <ResponsiveTd>{game.alias}</ResponsiveTd>
              <td>{game.creator.alias || game.creator.name }</td>
              <ResponsiveTd>{game.players?.length}</ResponsiveTd>
              <td>{game.maxPlayers}</td>
              <StyledTd center>
                <JoinGameButton 
                  showPopover={showPopover[game.id]}
                  handleShowPopover={handleShowPopover}
                  gameId={game.id}
                  
                />
              </StyledTd>
            </tr> 
          ))
        }
        </tbody>
      </Table>
  )
}

export default TableAvailableGames

