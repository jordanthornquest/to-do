// Import Bootstrap
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

// Import components
import Head from 'next/head'
import { Header } from '../components/Header/'
import { Home } from '../components/Home/'

// Render page
export default function Start() {
  return (
    <>
      <Head>
        <title>To-Do Application</title>
        <meta name="description" content="A to-do application built with Next.js and Firebase." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        className="mt-3 mt-sm-4"
      >
        <Card>
          <Card.Header
            as="header"
            className="align-items-center d-flex flex-row flex-wrap justify-content-between gap-2"
          >
            <Header />
          </Card.Header>
          <Card.Body
            as="main"
          >
            <Home />
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
