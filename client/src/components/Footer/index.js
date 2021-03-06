import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import logo from '../../assets/logo-footer.svg'
import axios from 'axios'
import RoomIcon from '@material-ui/icons/Room'
import PhoneIcon from '@material-ui/icons/Phone'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

const Footer = () => {
  const classes = useStyles()
  const [allLinks, setLinks] = useState(null)

  useEffect(() => {
    axios
      .get('/api/links')
      .then((res) => {
        setLinks(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <footer className={classes.root}>
      <Container className={classes.container}>
        <Grid
          container
          direction={'row'}
          justify={'center'}
          className={classes.gridContainer}
        >
          <Grid item className={classes.box}>
            <Typography className={classes.title} noWrap>
              Sound Tower
            </Typography>
            <img alt="company logo" src={logo} className={classes.logo} />
            <Typography className={classes.logoName} variant="subtitle2">
              Music Internet Hypermarket
            </Typography>
          </Grid>
          {allLinks &&
            allLinks.map((item) => {
              const links = item.links.map((link) => {
                if (item.title === 'Contacts') {
                  return (
                    <a href={link.url} key={link._id} className={classes.links}>
                      {link.description}
                    </a>
                  )
                }
                return (
                  <Typography
                    key={link._id}
                    className={classes.links}
                    component={Link}
                    to={link.url}
                  >
                    {link.description}
                  </Typography>
                )
              })
              return (
                <Grid item key={item._id} className={classes.gridItem}>
                  {item.title === 'Contacts' ? (
                    <Typography
                      className={classes.titleLinks}
                      component={Link}
                      style={{ textDecoration: 'none' }}
                      to="/contacts"
                    >
                      {item.title}
                    </Typography>
                  ) : (
                    <Typography className={classes.titleLinks}>
                      {item.title}
                    </Typography>
                  )}
                  <Grid container>
                    {item.title === 'Contacts' ? (
                      <Grid item className={classes.boxLinks}>
                        <RoomIcon className={classes.icon} fontSize="small" />
                        <PhoneIcon className={classes.icon} fontSize="small" />
                        <MailOutlineIcon
                          className={classes.icon}
                          fontSize="small"
                        />
                      </Grid>
                    ) : null}
                    <Grid item className={classes.boxLinks}>
                      {links}
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
