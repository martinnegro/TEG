import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react'
import '/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/styles/countries.css';
import GameContextProvider from 'contexts/GameContext';
import StatusContextProvider from 'contexts/StatusContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GameContextProvider>
        <StatusContextProvider>
          <Component {...pageProps} />
        </StatusContextProvider>
      </GameContextProvider>
    </SessionProvider>
  )
}

export default MyApp
