import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PopoverJoinGame from './PopoverJoinGame';
import Button from 'react-bootstrap/Button';

interface JoinGameButtonProps {
    handleShowPopover: Function,
    gameId: string,
    showPopover: boolean
}

const JoinGameButton = ({ showPopover, handleShowPopover, gameId }:JoinGameButtonProps) => {
  return (
    <OverlayTrigger  
        show={showPopover} 
        trigger='click' 
        placement='top' 
        overlay={<Popover><PopoverJoinGame gameId={gameId}/></Popover>}
    >
        <Button 
            style={{ width: '100%' }}
            onClick={handleShowPopover(gameId)}
            variant={ showPopover ? 'danger' : 'primary' }
            size="sm"
        >
        {
            showPopover ? 'Cancelar' : 'Unirse'
        }
        </Button>
    </OverlayTrigger>
)
}

export default JoinGameButton