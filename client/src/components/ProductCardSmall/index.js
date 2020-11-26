import React from 'react'
import { Link } from 'react-router-dom'

import useStyles from './style'
import PropTypes from 'prop-types'

import { Box, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'

const ProductCardSmall = (props) => {
  const { product } = props
  const style = useStyles()

  return (
    <Link style={{ textDecoration: 'none' }} to={`/product/${product.itemNo}`}>
      <Box style={{ width: '250px' }}>
        <Box zIndex="tooltip" className={style.newBox}>
          <Typography className={style.new}>New</Typography>
        </Box>
        <Box className={style.imgBox}>
          <img
            className={style.img}
            alt={product.name}
            src={product.imageUrls[0]}
          />
        </Box>
        <Box className={style.detailsBox}>
          <Container style={{ paddingTop: '5px', paddingBottom: '5px' }}>
            <Typography className={style.prodCategory}>
              {product.categories}
            </Typography>
            <Typography className={style.prodName}>{product.name}</Typography>
            <Box className={style.priceBox}>
              <Typography className={style.prodPrevPrice}>
                ₴{product.previousPrice}
              </Typography>
              <Typography className={style.prodCurrPrice}>
                ₴{product.currentPrice}
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </Link>
  )
}

ProductCardSmall.propTypes = {
  product: PropTypes.shape({
    categories: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    brand: PropTypes.string,
  }),
}

export default ProductCardSmall
