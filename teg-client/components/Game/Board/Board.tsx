import axios from 'axios'
import { GameContext } from 'contexts/GameContext'
import React, { useContext } from 'react'
import styles from 'styles/game.module.css'
import ShowActionCountry from './ShowActionsCountry/ShowActionCountry'
import ActionInfo from './ActionInfo/ActionInfo'

const Board = () => {
  const { armiesCountries } = useContext(GameContext)

  return (
    <div className={styles.board}>
      <ActionInfo />
      {
        armiesCountries?.map((country) => {
          console.log(country) 
          return <ShowActionCountry key={country.id} country={country}/>
        })
      }
    </div>
  )
}

export default Board