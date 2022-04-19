import React from 'react';
import Players from './Players';
import Board from './Board/Board'
import styles from 'styles/game.module.css'
interface GameProps {
    game: GameJson
}
const Game = ({ game }: GameProps) => {

    return (
        <div className={styles.container}>
            <Board game_id={game.id}/>
            <Players players={game.users_game} />
        </div>
    )
}

export default Game