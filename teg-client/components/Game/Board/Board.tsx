import axios from 'axios'
import { GameContext } from 'components/contexts/GameContext'
import React, { useContext, useEffect, useState } from 'react'
import styles from 'styles/game.module.css'
import { useSession } from 'next-auth/react'
import ShowActionCountry from './ShowActionsCountry/ShowActionCountry'
import ActionInfo from './ActionInfo/ActionInfo'

const Board = () => {
  const { data: session, status } = useSession();
  const { gameId } = useContext(GameContext)
  const [ armiesCountries, setArmiesCountries ] = useState<Army_Country[]>([])

  useEffect(() => {
    axios.get(`/api/game/armies-countries?game_id=${gameId}`)
    .then(({ data }) => {
      console.log(data)
      setArmiesCountries(data)
    })
    .catch((err) => console.log(err))
  },[])

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