import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  carouselWrapper: {
    maxWidth: 150,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  carouselWrapperMain: {
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid #818BB3',
    padding: 20,
  },
}))
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

export default ProductCardSlide
