import { ResponsiveTd, ResponsiveTh, StyledTh, StyledTd } from 'components/styledComponents/table.scss';
import Link from 'next/link';
import React from 'react';
import { Table } from 'react-bootstrap';

interface TableActiveGamesProps {
  games: GameJson[],
  light?: boolean
}

const TableActiveGames: React.FC<TableActiveGamesProps> = ({ games, light }) => {
  return (
    <Table bordered hover size="sm">
        <thead>
          <tr>
            <StyledTh light={light}>Partida</StyledTh>
            <StyledTh light={light}>Estado</StyledTh>
            <StyledTh light={light}>Próximo Jugador</StyledTh>
            <ResponsiveTh light={light}>Creador</ResponsiveTh>
          </tr>
        </thead>
        <tbody>
        {
          games.map( game => (
            <tr key={game.id}>
              <StyledTd light={light}>
                <Link href={`/game/${game.id}`}>
                  {game.alias}
                </Link>
              </StyledTd>
              <StyledTd light={light}>{game.status.title || ' - '}</StyledTd>
              <StyledTd light={light}>{game.nextPlayer?.user?.alias || game.nextPlayer?.user?.name || 'Todavía no comenzó!'}</StyledTd>
              <ResponsiveTd light={light}>{game.creator.alias || game.creator.name}</ResponsiveTd>
            </tr>
          ))
        }
        </tbody>
      </Table>
  )
}

export default TableActiveGames