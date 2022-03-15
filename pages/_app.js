// Import SWR and global configuration
import { SWRConfig } from 'swr'

// Import query fetcher from library
const fetcher = (...args) => fetch(...args).then(res => res.json())

// Import styles
import '../styles/style.scss'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        refreshInterval: 1000
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
