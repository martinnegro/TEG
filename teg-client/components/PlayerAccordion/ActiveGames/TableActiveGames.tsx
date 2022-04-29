import React from 'react';
import { Table } from 'react-bootstrap';

const TableActiveGames = ({ games }) => {
  console.log(games)
  return (
    <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Partida</th>
            <th>Estado</th>
            <th>Próximo Jugador</th>
            <th>Creador</th>
          </tr>
        </thead>
        <tbody>
        {
          games.map( game => (
            <tr key={game.id}>
              <td>
                <a href={`/game/${game.id}`}>
                  {game.alias}
                </a>
              </td>
              <td>{game.status.title || ' - '}</td>
              <td>{game.nextPlayer?.user.alias || game.nextPlayer?.user.name || 'Todavía no comenzó!'}</td>
              <td>{game.creator.alias || game.creator.name}</td>
            </tr>
          ))
        }
        </tbody>
      </Table>
  )
}

export default TableActiveGames