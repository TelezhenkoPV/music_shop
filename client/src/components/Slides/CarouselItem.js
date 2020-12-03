import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useStylesItem } from './styles'
import { useDispatch } from 'react-redux'
import { setToLastProducts } from '../../store/lastViewedProducts/lastProductsAction'

export const CarouselItem = ({ item }) => {
  const classes = useStylesItem()
  const history = useHistory()
  const dispatch = useDispatch()

  const {
    title,
    description,
    imageUrl,
    slideUrl = '/',
    product: { previousPrice = null, currentPrice = null } = {},
  } = item

  const { product } = item

  const addToLastProducts = () => {
    dispatch(setToLastProducts(product))
  }

  const onBtnClick = () => {
    slideUrl ? history.push(slideUrl) : console.log('There is no slide URL')
    addToLastProducts()
  }

  return (
    <div className={classes.root}>
      <div className="imageWrapper">
        <img src={imageUrl} alt={title} />
        <div className="imageFilter"></div>
      </div>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="details">
        <div className="price">
          {previousPrice && (
            <div className="previousPrice">₴{previousPrice}</div>
          )}
          {currentPrice && <div className="currentPrice">₴{currentPrice}</div>}
        </div>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={onBtnClick}
        >
          Detail
        </Button>
      </div>
    </div>
  )
}

CarouselItem.propTypes = {
  item: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    slideUrl: PropTypes.string.isRequired,
  }).isRequired,
}
