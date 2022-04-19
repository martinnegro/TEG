import React from 'react'
import ColorCircle from '../common/ColorCircle'

import styles from 'styles/game.module.css'

interface PlayersProps {
    players: User_Game[]
}

const Players = ({ players }: PlayersProps) => {

    return (
        <div>
            {
                players.map((p) => (
                    <div className={styles.playerRow}>
                        <ColorCircle colorHex={p.color.hex} diameter='25px'/>
                        <p>{p.user.alias || p.user.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Players