import '../styles/globals.css';
import "@fontsource/montserrat";
import "@fontsource/montserrat/700.css";
import { Provider } from "react-redux";
import { store } from "../store";
import BootstrapUser from '../components/BootstrapUser';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <BootstrapUser />
      <Component {...pageProps} />
    </Provider>
  );
}