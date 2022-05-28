import axios from 'axios'
import { GameContext } from 'contexts/GameContext'
import React, { useContext } from 'react'
import styles from 'styles/game.module.css'
import ShowActionCountry from './ShowActionsCountry/ShowActionCountry'
import ActionInfo from './ActionInfo/ActionInfo'

const Board = () => {
  const { gameId, armiesCountries } = useContext(GameContext)

  /* 
    Qué necesita Board para poder mostrar la info
      Qué tiene que hacer
        
      Si es su país
        Puedo sumar?
      
  */

  return (
    <div className={styles.board}>
      <ActionInfo />
      {
        armiesCountries?.map((country) => <ShowActionCountry key={country.id} country={country}/>)
      }
    </div>
  )
}

export default Board