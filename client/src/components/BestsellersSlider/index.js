import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box } from '@material-ui/core'
import useStyles from './styles'
import axios from 'axios'
import ProductCardSmall from '../ProductCardSmall'
import './slick-style.scss'

const BestsellersSlider = () => {
  const style = useStyles()
  const settingsLarge = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  }
  const settingsMedium = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  const settingsSmall = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }
  const settingsTiny = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const [products, setProducts] = useState([{ imgUrls: [] }])
  const bestsellers = products.filter((item) => {
    if (item.currentPrice <= 310) {
      return item
    }
    return null
  })

  useEffect(() => {
    axios('/api/products').then((res) => {
      setProducts(res.data)
    })
  }, [])
  return (
    <div>
      <Box className={style.categoriesTitle}>
        <hr className={style.line} />
        <h1 style={{ padding: '10px' }}>Bestsellers</h1>
        <hr className={style.line} />
      </Box>
      <Box className={style.largeSlider}>
        <Slider {...settingsLarge}>
          {bestsellers.map((item) => {
            return <ProductCardSmall key={item._id} product={item} />
          })}
        </Slider>
      </Box>
      <Box className={style.mediumSlider}>
        <Slider {...settingsMedium}>
          {bestsellers.map((item) => {
            return <ProductCardSmall key={item._id} product={item} />
          })}
        </Slider>
      </Box>
      <Box className={style.smallSlider}>
        <Slider {...settingsSmall}>
          {bestsellers.map((item) => {
            return <ProductCardSmall key={item._id} product={item} />
          })}
        </Slider>
      </Box>
      <Box className={style.tinySlider}>
        <Slider {...settingsTiny}>
          {bestsellers.map((item) => {
            return <ProductCardSmall key={item._id} product={item} />
          })}
        </Slider>
      </Box>
    </div>
  )
}
export default BestsellersSlider
