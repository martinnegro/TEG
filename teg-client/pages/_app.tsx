import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react'
import '/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/styles/countries.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
