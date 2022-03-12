import Head from 'next/head'
import { Header } from '../components/Header/'

export default function Home() {
  return (
    <div>
      <Head>
        <title>To-Do Application</title>
        <meta name="description" content="A to-do application built with Next.js and Firebase." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
      </main>
    </div>
  )
}
