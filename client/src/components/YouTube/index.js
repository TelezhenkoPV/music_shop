import React from 'react'
import { useStylesYoutubeVideo } from './styles'

export default function Youtube(props) {
  const { videoLink } = props
  const classes = useStylesYoutubeVideo()

  return (
    <iframe
      className={classes.youtubeVideo}
      title="Product video"
      src={videoLink}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}
