import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
