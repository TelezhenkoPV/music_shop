import React from 'react'
import { useDispatch } from 'react-redux'
import useStyles from './viewStyles'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

import PersonIcon from '@material-ui/icons/Person'
import CakeIcon from '@material-ui/icons/Cake'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import WcIcon from '@material-ui/icons/Wc'
import CheckIcon from '@material-ui/icons/Check'

import { toogleProfileEdit } from '../../store/user/userActions'
import { openModal } from '../../store/modal/modalAction'

import ChangePassword from './changePassword'

export default function ViewPersonalInformation({
  data: {
    firstName,
    lastName,
    middleName = '',
    gender,
    birthdate = '',
    email,
    telephone,
    addressDelivery = [],
    creditCard = [],
  },
}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleClickEdit = () => {
    dispatch(toogleProfileEdit(true))
  }

  const handleClickChangePassword = () => {
    dispatch(openModal(<ChangePassword />))
  }

  const addresses =
    addressDelivery && addressDelivery.length > 0
      ? addressDelivery.map(({ address, isDefault }, i) => {
          return (
            <ListItem key={address + i} dense disableGutters divider>
              <ListItemText primary={`${address}`} />
              {isDefault && (
                <ListItemIcon>
                  <CheckIcon className={classes.iconInline} />
                </ListItemIcon>
              )}
            </ListItem>
          )
        })
      : null

  const creditCards =
    creditCard && creditCard.length > 0
      ? creditCard.map(({ cardNumber, isDefault }, i) => {
          return (
            <ListItem key={cardNumber + i} dense disableGutters divider>
              <ListItemText primary={`${cardNumber}`} />
              {isDefault && (
                <ListItemIcon>
                  <CheckIcon className={classes.iconInline} />
                </ListItemIcon>
              )}
            </ListItem>
          )
        })
      : null

  return (
    <div className={classes.paper}>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <div className={classes.info}>
            <div className={classes.infoLabel}>
              <PersonIcon className={classes.iconInline} />
              <Typography className={classes.infoLabelText}>
                Full Name
              </Typography>
            </div>
            <Typography className={classes.infoData} noWrap>
              {firstName} {middleName} {lastName}
            </Typography>
          </div>

          <div className={classes.info}>
            <div className={classes.infoLabel}>
              <CakeIcon className={classes.iconInline} />
              <Typography className={classes.infoLabelText}>
                Birthday
              </Typography>
            </div>
            <Typography className={classes.infoData} noWrap>
              {birthdate &&
                birthdate.length === 10 &&
                `${birthdate.substring(8)}.${birthdate.substring(
                  5,
                  7
                )}.${birthdate.substring(0, 4)}`}
            </Typography>
          </div>

          <div className={classes.info}>
            <div className={classes.infoLabel}>
              <LocationOnIcon className={classes.iconInline} />
              <Typography className={classes.infoLabelText}>
                Delivary address
              </Typography>
            </div>
            <List dense className={classes.infoData}>
              {addresses}
            </List>
          </div>

          <div className={classes.info}>
            <div className={classes.infoLabel}>
              <CreditCardIcon className={classes.iconInline} />
              <Typography className={classes.infoLabelText}>
                Credit Cards
              </Typography>
            </div>
            <List dense className={classes.infoData}>
              {creditCards}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.info}>
            <div className={classes.infoLabel}>
              <PhoneIcon className={classes.iconInline} />
              <Typography className={classes.infoLabelText}>Phone</Typography>
            </div>
            <Typography className={classes.infoData} noWrap>
              {telephone}
            </Typography>
          </div>

          <div className={classes.info}>
            <div className={classes.infoLabel}>
              <EmailOutlinedIcon className={classes.iconInline} />
              <Typography className={classes.infoLabelText}>Email</Typography>
            </div>
            <Typography className={classes.infoData} noWrap>
              {email}
            </Typography>
          </div>

          <div className={classes.info}>
            <div className={classes.infoLabel}>
              <WcIcon className={classes.iconInline} />
              <Typography className={classes.infoLabelText}>Gender</Typography>
            </div>
            <Typography className={classes.infoData} noWrap>
              {gender}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <div className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleClickChangePassword}
        >
          Change password
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleClickEdit}
        >
          Edit profile
        </Button>
      </div>
    </div>
  )
}
