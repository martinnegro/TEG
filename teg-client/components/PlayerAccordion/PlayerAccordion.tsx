import React from 'react';
import { Accordion, AccordionContext } from 'react-bootstrap';

import IsOpen from './IsOpen'
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
                    <IsOpen  eventKey='0'>
                        <CreateGameForm/>
                    </IsOpen>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
                <Accordion.Header>
                    Unirse a un partida
                </Accordion.Header>
                <Accordion.Body>
                    <IsOpen  eventKey='1'>
                        <AvailableGames />
                    </IsOpen>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='2'>
                <Accordion.Header>
                    Partidas Activas
                </Accordion.Header>
                <Accordion.Body>
                    <IsOpen  eventKey='2'>
                        <ActiveGames />
                    </IsOpen>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='3'>
                <Accordion.Header>
                    Partidas terminadas
                </Accordion.Header>
                <Accordion.Body>
                    <IsOpen  eventKey='3'>
                        asdf
                    </IsOpen>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default PlayerAccordion