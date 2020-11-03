import React from 'react'
import { useSelector } from 'react-redux'
import Slides from '.'
import { slidesProduct } from '../../store/slides/slidesSelectors'

export default function ProductSlides() {
  const prodSlides = useSelector(slidesProduct)

  return <Slides items={prodSlides} />
}
