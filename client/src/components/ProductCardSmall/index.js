import React from 'react'
import { Box, Typography } from '@material-ui/core'
import useStyles from './style'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'

const ProductCardSmall = (props) => {
  const { product } = props
  const style = useStyles()

  return (
    <Link style={{ textDecoration: 'none' }} to={`/product/${product.itemNo}`}>
      <Box>
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
export default ProductCardSmall
