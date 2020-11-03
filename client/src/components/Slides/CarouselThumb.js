import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  thumbWrapper: {
    height: '50px',
    backgroundColor: '#ABAEFF',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      height: '25px',
    },
    '&>img': {
      height: '100%',
      objectFit: 'cover',
    },
  },
}))

export const CarouselThumb = ({ item: { imageUrl, title } }) => {
  const classes = useStyles()

  return (
    <div className={classes.thumbWrapper}>
      <img className={classes.thumbMedia} src={imageUrl} alt={title} />
    </div>
  )
}
