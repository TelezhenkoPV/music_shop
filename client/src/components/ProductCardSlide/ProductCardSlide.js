import React from 'react'
import { Carousel } from 'react-responsive-carousel'

const ProductCardSlide = ({ data }) => {
  return (
    <Carousel>
      {data &&
        data.map((e) => (
          <div style={{ width: 150 }}>
            <img src={`/${e}`} alt={e} />
          </div>
        ))}
    </Carousel>
  )
}

export default ProductCardSlide
