import axios from 'axios'
import Helmet from 'react-helmet'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useStyles } from './styles'

import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'

import ProductCardSlide from '../../components/ProductCardSlide/ProductCardSlide'
import Youtube from '../../components/YouTube'
import Comment from '../../components/Comment'

import { addProductToBasket } from '../../store/basket/basketAction'
import { getIsAuthenticated } from '../../store/user/userSelectors'
import { getIsInFavorites } from '../../store/favorites/favoritesSelectors'
import {
  getFavorites,
  toggleFavorites,
} from '../../store/favorites/favoritesActions'
import LastViewedProducts from '../../components/LastViewedProducts'

const PDP = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { id } = useParams()
  const isAuthenticated = useSelector(getIsAuthenticated)

  const [product, setProduct] = useState({})
  const isInFavorites = useSelector((store) =>
    getIsInFavorites(store, product._id)
  )
  const [isFavorite, setFavorite] = useState(isInFavorites)
  const [productAmount, setProductAmount] = useState(1)

  useEffect(() => {
    axios(`/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((e) => console.log(e))
  }, [id])

  useEffect(() => {
    if (product.quantity === 0) {
      setProductAmount(0)
    }

    if (productAmount < 1) {
      setProductAmount(1)
    }
    if (productAmount > product.quantity) {
      setProductAmount(productAmount - 1)
    }
    // eslint-disable-next-line
  }, [productAmount])

  useEffect(() => {
    if (isAuthenticated) dispatch(getFavorites())
  }, [dispatch, isAuthenticated])

  useEffect(() => {
    setFavorite(isInFavorites)
  }, [dispatch, isInFavorites])

  const handleFavorite = (id) => {
    dispatch(toggleFavorites(isFavorite, id))
  }

  const handleAddProductToBasket = (elem) => {
    dispatch(addProductToBasket(elem))
  }

  const onAddProduct = () => {
    handleAddProductToBasket(product)
  }

  return (
    <>
      <Helmet
        title="Product detail"
        meta={[
          {
            name: 'description',
            content:
              'Name, brand, images, color, quontity, price, coments, videos.',
          },
        ]}
      />
      <Container className={classes.root}>
        <Grid container className={classes.mainContainer}>
          <Grid className={classes.infoBlock}>
            <Typography className={classes.productTitle} variant="h4">
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: '12px', color: 'gray' }}
              className={classes.paddingStyle}
            >
              Vendor code: {product.itemNo}
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: '16px' }}
              className={classes.paddingStyle}
            >
              Price: $ {product.currentPrice}
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: '16px' }}
              className={classes.paddingStyle}
            >
              Brand: {product.brand}
            </Typography>
            <div style={{ height: 1, width: '100%', background: 'grey' }} />
            <Grid style={{ display: 'flex', marginTop: 20 }}>
              <Typography variant="body2" style={{ fontSize: '16px' }}>
                Color:{' '}
              </Typography>
              <div
                className={classes.color}
                style={{ background: product.color }}
              />
            </Grid>
            <Typography
              variant="body2"
              style={{ fontSize: '16px' }}
              className={classes.paddingStyle}
            >
              Amount:
              <IconButton
                disabled={product.quantity === 0}
                aria-label="down"
                className={classes.margin}
                size="small"
                onClick={() => setProductAmount(productAmount - 1)}
              >
                <ArrowDownwardIcon fontSize="inherit" />
              </IconButton>
              {productAmount}
              <IconButton
                disabled={product.quantity === 0}
                aria-label="up"
                className={classes.margin}
                size="small"
                onClick={() => setProductAmount(productAmount + 1)}
              >
                <ArrowUpwardIcon fontSize="inherit" />
              </IconButton>
            </Typography>
            <div style={{ height: 1, width: '100%', background: 'grey' }} />
            <Typography variant="h6" className={classes.paddingStyle}>
              Total: $ {productAmount * product.currentPrice}{' '}
            </Typography>
            <Grid>
              <Button
                disabled={product.quantity === 0}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                onClick={onAddProduct}
                startIcon={<ShoppingCartIcon style={{ color: '#fff' }} />}
              >
                Add to cart
              </Button>
              <Button
                aria-label="like"
                disabled={!isAuthenticated}
                onClick={() => handleFavorite(product._id)}
                startIcon={
                  isFavorite ? (
                    <FavoriteIcon style={{ color: '#C22A2A' }} />
                  ) : (
                    <FavoriteIcon />
                  )
                }
              >
                to favorites
              </Button>
            </Grid>
            <Grid style={{ display: 'flex', marginTop: 20 }}>
              <DoneIcon style={{ color: 'green' }} />
              <Typography variant="body2">
                Available:({product.quantity}){' '}
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.sliderStiles}>
            <ProductCardSlide data={product.imageUrls} main />
          </Grid>
        </Grid>
      </Container>
      <Youtube videoLink={product.videoLink} />
      <Typography
        variant="h3"
        style={{ textAlign: 'center', margin: '30px 0 20px' }}
      >
        Why i choose it?
      </Typography>
      <Comment productId={product._id} />
      <Typography
        variant="h3"
        style={{ textAlign: 'center', margin: '30px 0 20px' }}
      >
        Last viewed products
      </Typography>
      <LastViewedProducts />
    </>
  )
}

export default PDP
