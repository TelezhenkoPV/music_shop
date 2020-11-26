import React from 'react'
import PropTypes from 'prop-types'

import { useStyles } from './styles'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ProductCardSlide from '../ProductCardSlide/ProductCardSlide'
import { useHistory } from 'react-router'

export const ProductCard = (props) => {
  const classes = useStyles()
  const { element, onClickAddProduct } = props
  const [isFavorite, setFavorite] = React.useState(false)
  const history = useHistory()

  const handleFavorite = () => {
    setFavorite(!isFavorite)
  }

  const onAddProduct = () => {
    onClickAddProduct(element)
  }

  const forwardToCardDetails = () => {
    history.push({
      pathname: `/product/${element.itemNo}`,
      state: { product: element },
    })
  }

  return (
    <Card className={classes.root}>
      <div className={classes.colorBlock}>
        <div
          className={classes.colorItem}
          style={{ background: element.color }}
        />
      </div>

      <ProductCardSlide data={element.imageUrls} />

      <CardContent onClick={forwardToCardDetails} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" style={{ textTransform: 'uppercase' }}>
            {element.name}
          </Typography>
        </div>
        <Typography variant="body2">Price: {element.currentPrice}</Typography>
        <Typography variant="body2">Vendor code: {element.itemNo}</Typography>
        <Typography variant="body2">Brand: {element.brand}</Typography>
      </CardContent>
      <div className={classes.rightCardBlock}>
        <div className={classes.actionsBlock}>
          <Button
            variant="contained"
            disabled={element.quantity === 0}
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<ShoppingCartIcon style={{ color: '#fff' }} />}
            onClick={onAddProduct}
          >
            Add to cart
          </Button>

          <IconButton
            aria-label="like"
            style={{ width: 50 }}
            onClick={handleFavorite}
          >
            {isFavorite ? (
              <FavoriteIcon style={{ color: '#C22A2A' }} />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
        </div>
        <Typography variant="body1" className={classes.status}>
          {element.quantity !== 0
            ? `Available: ${element.quantity}`
            : 'Out of stock'}
        </Typography>
      </div>
    </Card>
  )
}

ProductCard.propTypes = {
  element: PropTypes.object,
  onClickAddProduct: PropTypes.func,
}
