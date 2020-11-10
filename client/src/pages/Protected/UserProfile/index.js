import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
  },
  title_box: {
    backgroundColor: '#f0f0ff',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
}))

function UserProfile() {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Paper>
        <Box className={classes.title_box}>
          <Typography variant="h4" style={{ marginBottom: '1%' }}>
            Personal profile
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Main
            </Link>
            <Link color="textPrimary" aria-current="page">
              Personal profile
            </Link>
          </Breadcrumbs>
        </Box>
      </Paper>
    </Container>
  )
}

export default UserProfile
