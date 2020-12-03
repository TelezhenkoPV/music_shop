import React from 'react'
import { Link } from 'react-router-dom'

import useStyles from './style'
import PropTypes from 'prop-types'

import { Box, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { setToLastProducts } from '../../store/lastViewedProducts/lastProductsAction'
import { useDispatch } from 'react-redux'

const ProductCardSmall = (props) => {
  const { product, topRightBadge = 'New' } = props
  const style = useStyles()
  const dispatch = useDispatch()

  const addToLastProducts = () => {
    dispatch(setToLastProducts(product))
  }

  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={`/product/${product.itemNo}`}
      onClick={addToLastProducts}
    >
      <Box style={{ width: '250px' }}>
        {topRightBadge !== null ? (
          <Box zIndex="tooltip" className={style.newBox}>
            <Typography className={style.new}>{topRightBadge}</Typography>
          </Box>
        ) : null}
        <Box className={style.imgBox}>
          <img
            className={style.img}
            alt={product.name}
            src={`/${product.imageUrls[0]}`}
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
  topRightBadge: PropTypes.string,
}

export default ProductCardSmall
