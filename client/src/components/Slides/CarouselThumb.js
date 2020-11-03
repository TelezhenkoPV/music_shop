import React from 'react'
import { useStylesThumb } from './styles'

export const CarouselThumb = ({ item: { imageUrl, title } }) => {
  const classes = useStylesThumb()

  return (
    <div className={classes.thumbWrapper}>
      <img className={classes.thumbMedia} src={imageUrl} alt={title} />
    </div>
  )
}
