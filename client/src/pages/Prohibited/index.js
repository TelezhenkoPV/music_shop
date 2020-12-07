import React from 'react'
import Helmet from 'react-helmet'
import useStyles from './styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router'
import Container from '@material-ui/core/Container'

function Prohibited() {
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <Helmet
        title="Access Denied"
        meta={[{ name: 'description', content: 'Authorized access only.' }]}
      />
      <Container className={classes.root}>
        <Grid container spacing={2} className={classes.errorContainer}>
          <Typography variant="h1">403</Typography>
          <Typography variant="h6">Доступ запрещен...</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={history.goBack}
          >
            Go Back
          </Button>
        </Grid>
      </Container>
    </>
  )
}

export default Prohibited
