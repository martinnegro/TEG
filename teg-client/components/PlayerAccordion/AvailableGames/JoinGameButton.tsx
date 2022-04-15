import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PopoverJoinGame from './PopoverJoinGame';
import Button from 'react-bootstrap/Button';

interface JoinGameButtonProps {
    handleShowPopover: Function,
    GAME_ID: string,
    showPopover: boolean
}

const JoinGameButton = ({ showPopover, handleShowPopover, GAME_ID }:JoinGameButtonProps) => {
  return (
    <OverlayTrigger  
        show={showPopover} 
        trigger='click' 
        placement='top' 
        overlay={<Popover><PopoverJoinGame id_game={GAME_ID}/></Popover>}
    >
        <Button 
        style={{ width: '100%' }}
        onClick={handleShowPopover(GAME_ID)}
        variant={ showPopover ? 'danger' : 'primary' }
        >
        {
            showPopover ? 'Cancelar' : 'Unirse'
        }
        </Button>
    </OverlayTrigger>
)
}

export default JoinGameButton