import React from 'react'
import Helmet from 'react-helmet'

import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import Header from './components/Header'
import MainRoutes from './routes/MainRoutes'
import Footer from './components/Footer'
import Modal from './components/Modal'
import Notifier from './components/Notifier'
import ErrorBoundary from './ErrorBoundary'

const useStyles = makeStyles((theme) => ({
  mainBlock: {
    height: '100vh',
  },
}))

function App() {
  const classes = useStyles()

  return (
    <Box component={'div'} className={classes.mainBlock} bgcolor="garys.gray">
      <Helmet
        defaultTitle="Sound Tower - music shop"
        titleTemplate="Sound Tower - %s"
        title="music shop"
        htmlAttributes={{ lang: 'en' }}
        meta={[
          {
            name: 'description',
            content:
              'Sound Tower - music shop. Guitars, Boosters, Percussions, Basses, Keyboards, Accessories',
          },
        ]}
        links={{
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon.ico',
        }}
      />
      <Header />
      <ErrorBoundary>
        <MainRoutes />
      </ErrorBoundary>
      <Footer />
      <Modal />
      <Notifier />
    </Box>
  )
}

export default App
