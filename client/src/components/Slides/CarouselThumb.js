import React from 'react'
import PropTypes from 'prop-types'
import { useStylesThumb } from './styles'

export const CarouselThumb = ({ item: { imageUrl, title } }) => {
  const classes = useStylesThumb()

  return (
    <div className={classes.thumbWrapper}>
      <img className={classes.thumbMedia} src={imageUrl} alt={title} />
    </div>
  )
}

CarouselThumb.propTypes = {
  item: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}
