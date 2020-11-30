import React from 'react'

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
