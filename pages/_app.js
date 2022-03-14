// Import SWR and global configuration
import { SWRConfig } from 'swr'

// Import query fetcher from library
const fetcher = (...args) => fetch(...args).then(res => res.json())

// Import styles
import 'modern-normalize/modern-normalize.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
