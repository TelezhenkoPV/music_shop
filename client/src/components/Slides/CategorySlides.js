import React from 'react'
import { useSelector } from 'react-redux'
import Slides from '.'
import { slidesCategory } from '../../store/slides/slidesSelectors'

export default function CategorySlides() {
  const items = useSelector(slidesCategory)

  return <Slides items={items} />
}
