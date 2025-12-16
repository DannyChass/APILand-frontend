import '../styles/globals.css';
import Head from 'next/head';
import "@fontsource/montserrat";
import "@fontsource/montserrat/700.css";
import Home from './HomePage';
import Header from '../components/Header';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App({ Component, pageProps }) {
  return (
    <>
      
      <Component {...pageProps} />
    </>
  );
}

export default App;
