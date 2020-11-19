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
  const [allLinks, setLinks] = useState([{ links: [] }])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/links')
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
        <Grid container spacing={10} direction={'row'} justify={'center'}>
          <Grid item className={classes.box}>
            <Typography className={classes.title} noWrap>
              Sound Tower
            </Typography>
            <img alt="company logo" src={logo} className={classes.logo} />
            <Typography className={classes.logoName} variant="subtitle2">
              Музыкальный интернет-гипермаркет
            </Typography>
          </Grid>
          {allLinks.map((item) => {
            const links = item.links.map((link) => (
              <Typography
                key={link.id}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '13px',
                  padding: '3px',
                }}
                component={Link}
                to={link.url}
              >
                {link.description}
              </Typography>
            ))
            return (
              <Grid item key={item._id}>
                <Typography className={classes.titleLinks}>
                  {item.title}
                </Typography>
                <Grid container>
                  {item.title === 'Контакты' ? (
                    <Grid item className={classes.boxLinks}>
                      <RoomIcon
                        style={{ margin: '2px', color: '#fff' }}
                        fontSize="small"
                      />
                      <PhoneIcon
                        style={{ margin: '2px', color: '#fff' }}
                        fontSize="small"
                      />
                      <MailOutlineIcon
                        style={{ margin: '2px', color: '#fff' }}
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
