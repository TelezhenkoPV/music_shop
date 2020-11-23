import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import React from 'react'

const ElevationScroll = (props) => {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

export default ElevationScroll
