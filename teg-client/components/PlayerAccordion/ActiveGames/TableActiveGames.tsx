import { ResponsiveTd, ResponsiveTh } from 'components/styledComponents/table.scss';
import Link from 'next/link';
import React from 'react';
import { Table } from 'react-bootstrap';

interface TableActiveGamesProps {
  games: GameJson[]
}

const TableActiveGames: React.FC<TableActiveGamesProps> = ({ games }) => {
  return (
    <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>Partida</th>
            <th>Estado</th>
            <th>Próximo Jugador</th>
            <ResponsiveTh>Creador</ResponsiveTh>
          </tr>
        </thead>
        <tbody>
        {
          games.map( game => (
            <tr key={game.id}>
              <td>
                <Link href={`/game/${game.id}`}>
                  {game.alias}
                </Link>
              </td>
              <td>{game.status.title || ' - '}</td>
              <td>{game.nextPlayer?.user?.alias || game.nextPlayer?.user?.name || 'Todavía no comenzó!'}</td>
              <ResponsiveTd>{game.creator.alias || game.creator.name}</ResponsiveTd>
            </tr>
          ))
        }
        </tbody>
      </Table>
  )
}

export default TableActiveGames