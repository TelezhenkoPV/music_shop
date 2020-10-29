import React from 'react'
import Header from './components/Header'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import theme from './theme/Theme'
import Footer from './components/Footer'
import Box from '@material-ui/core/Box'
import MainRoutes from './routes/MainRoutes'
import { getDataFromServe } from './func'

const useStyles = makeStyles((theme) => ({
  mainBlock: {
    height: '100vh',
  },
}))

function App() {
  const classes = useStyles()

  getDataFromServe('http://localhost:5000/api/products/filter?&color=red')

  return (
    <Box component={'div'} className={classes.mainBlock} bgcolor="garys.gray">
      <ThemeProvider theme={theme}>
        <Header />
        <MainRoutes />
        <Footer />
      </ThemeProvider>
    </Box>
  )
}

export default App
