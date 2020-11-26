import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import PropTypes from 'prop-types'

import { useStyles } from './styles'

const ProductCardSlide = ({ data, main }) => {
  const classes = useStyles()

  return (
    <Carousel showIndicators={false} showArrows={false} showStatus={false}>
      {!main
        ? data &&
          data.map((e, index) => (
            <div className={classes.carouselWrapper} key={index}>
              <img src={`/${e}`} alt={e} style={{ width: '60%' }} />
            </div>
          ))
        : data &&
          data.map((e, index) => (
            <div className={classes.carouselWrapperMain} key={index}>
              <img src={`/${e}`} alt={e} style={{ width: '60%' }} />
            </div>
          ))}
    </Carousel>
  )
}

ProductCardSlide.propTypes = {
  data: PropTypes.array,
  main: PropTypes.bool,
}

export default ProductCardSlide
