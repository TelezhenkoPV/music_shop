import React from 'react'
import PropTypes from 'prop-types'
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
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}

Youtube.propTypes = {
  videoLink: PropTypes.string,
}
