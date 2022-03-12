import React from 'react';
import { Table } from 'react-bootstrap';

const TableActiveGames = ({ games }) => {
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
        {games.map( game => (
          <tr key={game.id}>
            <td>{game.alias}</td>
            <td>{game.status.title || 'nada'}</td>
            <td>{game.user_action_required || 'Todavía no comenzó!'}</td>
            <td>{game.creator.alias || game.creator.name}</td>
          </tr>
        ))}
        </tbody>
      </Table>
  )
}

export default TableActiveGames