import React from 'react';
import Panel from './Panel/Panel';
import Board from './Board/Board'
import styles from 'styles/game.module.css'
import GameStatus from './GameStatus'

const Game = () => {

    return (
        
        <div className={styles.container}>
            <GameStatus />
            <Board />
            <Panel />
        </div>
        
    )
}

export default Game