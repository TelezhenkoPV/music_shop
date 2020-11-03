import React from 'react'
import { useSelector } from 'react-redux'
import Slides from '.'
import { slidesCategory } from '../../store/slides/slidesSelectors'

export default function ProductSlides() {
  const categorySlides = useSelector(slidesCategory)

  return <Slides items={categorySlides} />
}
