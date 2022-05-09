import React from 'react'
import Players from './Players'
import StatusDescription from './StatusDescription'
import styles from 'styles/game.module.css'

const Panel = () => {
    
    return (
        <div className={styles.panel}>
            <StatusDescription />
            <Players />
        </div>
  )
}

export default Panel