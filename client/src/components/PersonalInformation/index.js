import React from 'react'
import { useSelector } from 'react-redux'
import useStyles from './styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import PersonIcon from '@material-ui/icons/Person'
import CakeIcon from '@material-ui/icons/Cake'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import WcIcon from '@material-ui/icons/Wc'
import CheckIcon from '@material-ui/icons/Check'

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
      <ListItem disableGutters divider>
        <ListItemText primary={`${i + 1}. ${address}`} />
        {isDefault && (
          <ListItemIcon>
            <CheckIcon className={classes.iconInline} />
          </ListItemIcon>
        )}
      </ListItem>
    )
  })

  const creditCards = creditCart.map(({ id, isDefault }, i) => {
    return (
      <ListItem disableGutters divider>
        <ListItemText primary={`${i + 1}. ${id}`} />
        {isDefault && (
          <ListItemIcon>
            <CheckIcon className={classes.iconInline} />
          </ListItemIcon>
        )}
      </ListItem>
    )
  })

  return (
    <>
      <Container>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <div className={classes.info}>
              <div className={classes.infoLabel}>
                <PersonIcon className={classes.iconInline} />
                <Typography>Full Name</Typography>
              </div>
              <Typography className={classes.infoData} noWrap>
                {lastName} {firstName} {familyName}
              </Typography>
            </div>

            <div className={classes.info}>
              <div className={classes.infoLabel}>
                <CakeIcon className={classes.iconInline} />
                <Typography>Birthday</Typography>
              </div>
              <Typography className={classes.infoData} noWrap>
                {birthdate}
              </Typography>
            </div>

            <div className={classes.info}>
              <div className={classes.infoLabel}>
                <LocationOnIcon className={classes.iconInline} />
                <Typography>Delivary address</Typography>
              </div>
              <Typography className={classes.infoData} noWrap>
                <List>{addresses}</List>
              </Typography>
            </div>

            <div className={classes.info}>
              <div className={classes.infoLabel}>
                <CreditCardIcon className={classes.iconInline} />
                <Typography>Credit Cards</Typography>
              </div>
              <Typography className={classes.infoData} noWrap>
                <List>{creditCards}</List>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.info}>
              <div className={classes.infoLabel}>
                <PhoneIcon className={classes.iconInline} />
                <Typography>Phone</Typography>
              </div>
              <Typography className={classes.infoData} noWrap>
                {telephone}
              </Typography>
            </div>

            <div className={classes.info}>
              <div className={classes.infoLabel}>
                <EmailOutlinedIcon className={classes.iconInline} />
                <Typography>Email</Typography>
              </div>
              <Typography className={classes.infoData} noWrap>
                {email}
              </Typography>
            </div>

            <div className={classes.info}>
              <div className={classes.infoLabel}>
                <WcIcon className={classes.iconInline} />
                <Typography>Gender</Typography>
              </div>
              <Typography className={classes.infoData} noWrap>
                {gender}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
