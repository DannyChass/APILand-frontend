import '../styles/globals.css';
import Head from 'next/head';
import "@fontsource/montserrat";
import "@fontsource/montserrat/700.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js App ApiHub</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
