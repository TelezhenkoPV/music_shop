import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './slick-style.scss'
import { useSelector } from 'react-redux'
import { lastProductsSelector } from '../../store/lastViewedProducts/lastProductsSelectors'
import Container from '@material-ui/core/Container'
import ProductCardSmall from '../ProductCardSmall'

function LastViewedProducts() {
  const products = useSelector(lastProductsSelector)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Container style={{ marginBottom: 20 }}>
      <Slider {...settings}>
        {products.map((item) => {
          return <ProductCardSmall key={item._id} product={item} />
        })}
      </Slider>
    </Container>
  )
}

export default LastViewedProducts
