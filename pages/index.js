// Import SWR for client-side data loading
import useSWR from 'swr'

// Import components
import Head from 'next/head'
import { Header } from '../components/Header/'

// Create fetcher for API queries
const fetcher = (...args) => fetch(...args).then(res => res.json())

// Create page
export default function ToDos() {
  // Use SWR and fetcher to ping API for entries
  const { data, error } = useSWR('/api/list', fetcher)

  // Return message on API failure
  if (error) return <div>failed to load</div>

  // Show loading message while getting data
  if (!data) return <div>loading...</div>

  // Return list of todos
  return (
    <div>
      <Head>
        <title>To-Do Application</title>
        <meta name="description" content="A to-do application built with Next.js and Firebase." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {data.name}
      </main>
    </div>
  )
}
