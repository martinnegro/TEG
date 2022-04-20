import { GameContext } from 'components/contexts/GameContext';
import React, { useContext } from 'react';
import styles from 'styles/game.module.css'


const GameStatus = () => {
    const { status } = useContext(GameContext);
    return (
        <h3 className={styles.statusTitle}>{ status.title }</h3>
    )
}

export default GameStatus