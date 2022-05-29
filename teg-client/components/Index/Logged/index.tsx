import ActiveGames from 'components/PlayerAccordion/ActiveGames/ActiveGames'
import TableActiveGames from 'components/PlayerAccordion/ActiveGames/TableActiveGames'
import { HomeTitle, LoggedContainer } from 'components/styledComponents/home.scss'
import Link from 'next/link'
import React from 'react'

const Logged = ({ session }) => {
  return (
    <LoggedContainer>
      <HomeTitle>
        T.E.G.
      </HomeTitle>
      <h2>
        Hola { session.user.alias || session.user.name }!
      </h2>
      <p>
        Debajo puedes acceder a las mesas en las que participas o puedes crear nuevas y unirte a otras en tu <Link href='/player'>panel de usuario</Link>.
      </p>
      <ActiveGames></ActiveGames>
    </LoggedContainer>
  )
}

export default Logged