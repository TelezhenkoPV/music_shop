import React from 'react'
import PropTypes from 'prop-types'
import useStyles from './styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router'
import Container from '@material-ui/core/Container'

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

NotFound.propTypes = {
  history: PropTypes.object,
}

export default withRouter(NotFound)
