import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import Header from './components/Header'
import MainRoutes from './routes/MainRoutes'
import Footer from './components/Footer'
import Modal from './components/Modal'
import Notifier from './components/Notifier'

import { getCustomer, checkToken } from './store/user/userActions'

// import { getDataFromServe } from './func'

const useStyles = makeStyles((theme) => ({
  mainBlock: {
    height: '100vh',
  },
}))

function App() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCustomer())
    dispatch(checkToken())
  })

  // getDataFromServe('http://localhost:5000/api/products/filter?&color=red')

  return (
    <Box component={'div'} className={classes.mainBlock} bgcolor="garys.gray">
      <Header />
      <MainRoutes />
      <Footer />
      <Modal />
      <Notifier />
    </Box>
  )
}

export default App
