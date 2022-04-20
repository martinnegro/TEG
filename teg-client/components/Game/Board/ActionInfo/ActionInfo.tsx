import { GameContext } from 'components/contexts/GameContext'
import React, { useContext, useEffect, useState } from 'react'
import infoShouldSay from './infoShouldSay';
import styles from 'styles/game.module.css'

const ActionInfo = () => {
    const { status, id_next_player, nextPlayer, id_user_game_logged_player } = useContext(GameContext);
    const [ isActionRequired, setIsActionRequired ] = useState(false);

    useEffect(() => {
        if (id_next_player === id_user_game_logged_player) setIsActionRequired(true); 
        else setIsActionRequired(false);
    },[]);

    return (
        <div className={styles.actionInfo}>
            {
                isActionRequired ?
                <p>
                    { infoShouldSay(status.id) }
                </p>
                :
                <p>
                    Debes esperar a que { `${nextPlayer?.user.alias || nextPlayer?.user.name}` } complete su turno
                </p>
            }
        </div>
    )
}

export default ActionInfo