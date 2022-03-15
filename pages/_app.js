// Import SWR and global configuration
import { SWRConfig } from "swr";

// Import query fetcher from library
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// Import Font Awesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// Import styles
import "../styles/styles.scss";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        refreshInterval: 60000,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
