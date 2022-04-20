import React, { useContext } from 'react'
import ColorCircle from 'components/common/ColorCircle'

import styles from 'styles/game.module.css'
import { GameContext, GameContextValues } from 'components/contexts/GameContext'

interface PlayersProps {
    
}

const Players = () => {
    const { players, id_next_player } = useContext(GameContext) as GameContextValues;
    return (
        <div>
            {
                players.map((p) => (
                    <div key={p.id} className={`${styles.playerRow} ${p.id === id_next_player ? styles.userActionRequired : ''}`}>
                        {   
                            id_next_player === p.id ?
                            <p>Debe jugar:</p> 
                            :null
                        }
                        <ColorCircle colorHex={p.color.hex} diameter='25px'/>
                        <p>{p.user.alias || p.user.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Players