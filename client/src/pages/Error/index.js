import React, { useState } from 'react'
import * as Sentry from '@sentry/react'
import useStyles from './styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ReplayIcon from '@material-ui/icons/Replay'
import HomeIcon from '@material-ui/icons/Home'
import FeedbackIcon from '@material-ui/icons/Feedback'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Tooltip from '@material-ui/core/Tooltip'

export default function Error(props) {
  const classes = useStyles()

  const { errorInfo, eventId } = props
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="error" className={classes.avatar}>
            Err
          </Avatar>
        }
        title="Oooops..., Error!!!"
        titleTypographyProps={{
          variant: 'h6',
          color: 'primary',
        }}
      />
      <CardMedia
        className={classes.media}
        image="/images/error/error.gif"
        title="Error"
      />
      <CardContent>
        <Typography variant="subtitle2" color="primary">
          Something went wrong. But we already sent droids to fix it...
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Tooltip title="Try to reload page">
          <IconButton
            aria-label="reload..."
            onClick={() => {
              window.location.reload()
            }}
          >
            <ReplayIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Go to Home page">
          <IconButton aria-label="main page" href="/">
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Leave feedback">
          <IconButton
            aria-label="feedback"
            onClick={() => Sentry.showReportDialog({ eventId })}
          >
            <FeedbackIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Show additional technical information">
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Call Stack Info:</Typography>
          <Typography paragraph>
            {errorInfo && errorInfo.componentStack.toString()}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
