import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
  },
  errorContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    alignItems: 'center',
  },
  btn: {
    margin: 20,
  },
}))
function NotFound(props) {
  const classes = useStyles()
  const { history } = props

  return (
    <Container className={classes.root}>
      <Grid container spacing={2} className={classes.errorContainer}>
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">Page is not exist...</Typography>
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
  )
}

export default withRouter(NotFound)
