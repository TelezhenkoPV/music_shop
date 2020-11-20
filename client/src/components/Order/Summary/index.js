import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {
  basketSelector,
  totalCountSelector,
  totalPriceSelector,
} from '../../../store/basket/basketSelectors'
import { removeCartItem } from '../../../store/basket/basketAction'
import ProductPreview from '../../ProductPreview'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'

export default function Summary() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const basket = useSelector(basketSelector)
  const totalPrice = useSelector(totalPriceSelector)
  const totalCount = useSelector(totalCountSelector)

  const onRemoveItem = (_id) => {
    dispatch(removeCartItem(_id))
  }

  const productPreview = () => {
    return basket.map((elem) => {
      return (
        <ProductPreview
          key={elem._id}
          img={elem.imageUrls}
          id={elem._id}
          color={elem.color}
          name={elem.name}
          price={elem.currentPrice}
          onRemove={onRemoveItem}
          totalPrice={totalPrice}
          totalCount={totalCount}
          product={elem}
        />
      )
    })
  }

  return (
    <Box className={classes.background_box}>
      <Box
        className={classes.title_box}
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h6" style={{ textTransform: 'uppercase' }}>
          Summary
        </Typography>
        <Link to="/basket" style={{ color: 'grey', textDecoration: 'none' }}>
          Edit cart
        </Link>
      </Box>
      <Container maxWidth="md">
        <Box>
          <Typography style={{ margin: '30px 17px 0 17px' }}>
            {totalCount} products
          </Typography>
          {productPreview()}
        </Box>
      </Container>
      <Box
        className={classes.totalPrice_box}
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h6" style={{ textTransform: 'uppercase' }}>
          Total:
        </Typography>
        <Typography variant="h6">${totalPrice}</Typography>
      </Box>
    </Box>
  )
}
