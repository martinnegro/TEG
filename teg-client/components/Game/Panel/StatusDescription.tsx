import { GameContext } from 'components/contexts/GameContext'
import React, { useContext } from 'react';
import styles from 'styles/game.module.css';

const StatusDescription = () => {
    const { status } = useContext(GameContext);

    return (
        <p className={styles.statusDescription}>{ status.description }</p>
    )
}

export default StatusDescription