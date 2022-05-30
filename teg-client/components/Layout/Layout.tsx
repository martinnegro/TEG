import { MainStyled } from 'components/styledComponents/home.scss';
import Head from 'next/head';
import Header from './Header';

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>T.E.G.</title>
        <meta
          name="T.E.G."
          content="Juega al T.E.G. online con tus amigos!"
        />
        <meta name="og:title" content="T.E.G." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      { 
        !home &&
        <Header />
      }
      <MainStyled>{ children }</MainStyled>
      <footer></footer>
    </>
  )
}
