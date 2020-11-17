import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import { getSlides } from '../../store/slides/slidesActions'
import ProductSlides from '../../components/Slides/ProductSlides'
import Categories from '../../components/Categories'

function Main() {
  const dispatch = useDispatch()

  useEffect(() => dispatch(getSlides()), [dispatch])

  return (
    <Container>
      <ProductSlides />
      <Categories />
    </Container>
  )
}

export default Main
