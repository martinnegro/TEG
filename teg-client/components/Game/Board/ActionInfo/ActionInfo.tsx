import { StatusContext } from 'components/contexts/StatusContext'
import React, { useContext, useEffect, useState } from 'react'

import styles from 'styles/game.module.css'

const ActionInfo = () => {
    const { infoSay } = useContext(StatusContext);   

    return (
        <div className={styles.actionInfo}>
            <p>
                { infoSay }
            </p>
        </div>
    )
}

export default ActionInfo