import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react'
import '/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/styles/countries.css';
import GameContextProvider from 'components/contexts/GameContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GameContextProvider>
        <Component {...pageProps} />
      </GameContextProvider>
    </SessionProvider>
  )
}

export default MyApp
