import React from 'react';
import { Accordion } from 'react-bootstrap';

import CreateGameForm from './CreateGameForm/CreateGameForm';
import ActiveGames from './ActiveGames/ActiveGames';
import AvailableGames from './AvailableGames/AvailableGames';

const PlayerAccordion = () => {
  return (
    <Accordion>
        <Accordion.Item eventKey='0'>
            <Accordion.Header>
                Nueva partida
            </Accordion.Header>
            <Accordion.Body>
                <CreateGameForm/>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
            <Accordion.Header>
                Unirse a un partida
            </Accordion.Header>
            <Accordion.Body>
                <AvailableGames />
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
            <Accordion.Header>
                Partidas Activas
            </Accordion.Header>
            <Accordion.Body>
                <ActiveGames />
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='3'>
            <Accordion.Header>
                Partidas terminadas
            </Accordion.Header>
            <Accordion.Body>
                asdf
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  )
}

export default PlayerAccordion