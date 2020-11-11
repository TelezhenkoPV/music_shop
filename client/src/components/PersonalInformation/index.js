import React from 'react'
import { useSelector } from 'react-redux'
import useStyles from './styles'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import PersonIcon from '@material-ui/icons/Person'
import CakeIcon from '@material-ui/icons/Cake'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import WcIcon from '@material-ui/icons/Wc'

import { getUserData } from '../../store/user/userSelectors'

export default function PersonalInformation() {
  const classes = useStyles()
  const {
    firstName,
    lastName,
    familyName,
    gender,
    birthdate,
    email,
    telephone,
    addressDelivery,
    creditCart,
  } = useSelector(getUserData)

  const addresses = addressDelivery.map(({ address, isDefault }, i) => {
    return (
      <Typography key={address + i} variant="body1" noWrap>
        {i + 1}. {address} {isDefault && '(default)'}
      </Typography>
    )
  })

  const creditCards = creditCart.map(({ id, isDefault }, i) => {
    return (
      <Typography key={id + i} variant="body1" noWrap>
        {i + 1}. {id} {isDefault && '(default)'}
      </Typography>
    )
  })

  return (
    <>
      <Container>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5">
                Full Name <PersonIcon />
              </Typography>
              <Typography variant="body1" gutterBottom noWrap>
                {lastName} {firstName} {familyName}
              </Typography>
              <Typography variant="h5">
                Birthday <CakeIcon />
              </Typography>
              <Typography variant="body1" gutterBottom noWrap>
                {birthdate}
              </Typography>
              <Typography variant="h5">
                Delivary address <LocationOnIcon />
              </Typography>
              <Box>{addresses}</Box>
              <Typography variant="h5">
                Credit Cards <CreditCardIcon />
              </Typography>
              <Box>{creditCards}</Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5">
                Phone <PhoneIcon />
              </Typography>
              <Typography variant="body1" gutterBottom noWrap>
                {telephone}
              </Typography>
              <Typography variant="h5">
                Email <EmailOutlinedIcon />
              </Typography>
              <Typography variant="body1" gutterBottom noWrap>
                {email}
              </Typography>
              <Typography variant="h5">
                Gender <WcIcon />
              </Typography>
              <Typography variant="body1" gutterBottom noWrap>
                {gender}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
