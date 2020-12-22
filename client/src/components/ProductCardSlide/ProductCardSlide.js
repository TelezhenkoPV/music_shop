import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import PropTypes from 'prop-types'

import { useStyles } from './styles'

const ProductCardSlide = ({ data, main }) => {
  const classes = useStyles()

  return (
    <Carousel
      className={classes.carouselWrapper}
      showArrows={true}
      showThumbs={false}
      showStatus={false}
    >
      {!main
        ? data &&
          data.map((e, index) => (
            <div key={index} className={classes.imageContainer}>
              <img src={`/${e}`} alt={e} className={classes.image} />
            </div>
          ))
        : data &&
          data.map((e, index) => (
            <div key={index} className={classes.imageContainer}>
              <img src={`/${e}`} alt={e} className={classes.image} />
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
