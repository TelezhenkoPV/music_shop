import React from 'react'
import Helmet from 'react-helmet'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import cart_icon from '../../assets/cart_icon.svg'
import Button from '@material-ui/core/Button'
import BasketCard from '../../components/BasketCard'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeCartItem,
  plusItem,
  minusItem,
} from '../../store/basket/basketAction'
import {
  basketSelector,
  totalCountSelector,
  totalPriceSelector,
} from '../../store/basket/basketSelectors'
import useStyles from './styles'

function Basket() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const basket = useSelector(basketSelector)
  const totalPrice = useSelector(totalPriceSelector)
  const totalCount = useSelector(totalCountSelector)

  const onRemoveItem = (product) => {
    dispatch(removeCartItem(product))
  }

  const onPlusItem = (product) => {
    dispatch(plusItem(product))
  }

  const onMinusItem = (product) => {
    dispatch(minusItem(product))
  }

  const basketCard = () => {
    return basket.map((elem) => {
      return (
        <BasketCard
          key={elem.product._id}
          img={elem.product.imageUrls}
          id={elem.product._id}
          color={elem.product.color}
          name={elem.product.name}
          price={elem.product.currentPrice}
          onRemove={onRemoveItem}
          totalPrice={elem.productPrice}
          totalCount={elem.cartQuantity}
          onMinus={onMinusItem}
          onPlus={onPlusItem}
          product={elem}
        />
      )
    })
  }

  return (
    <>
      <Helmet
        title="Shopping Cart"
        meta={[{ name: 'description', content: 'Shopping Cart' }]}
      />
      <Box>
        <Box className={classes.title_box}>
          <Typography variant="h4" style={{ marginBottom: '1%' }}>
            Cart
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Home
            </Link>
            <Link color="textPrimary" href="/basket" aria-current="page">
              Cart
            </Link>
          </Breadcrumbs>
        </Box>
        <Box className={classes.tabs_box}>
          <Container>
            <Grid container direction="row">
              <Grid item xs={5}>
                <Typography variant="subtitle1">Name</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="subtitle1">Color</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle1">Price</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle1">Quantity</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle1">Total price</Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {basketCard()}

        {totalCount ? (
          <Container maxWidth="xl" className={classes.end_box}>
            <div className={classes.wrapper}>
              <Box className={classes.price_box}>
                <Typography variant="h5" className={classes.price_box_text}>
                  Total
                </Typography>
                <Typography variant="h4" className={classes.price_box_text}>
                  ${totalPrice}
                </Typography>
              </Box>
            </div>
            <Box className={classes.buttons_box}>
              <Button
                startIcon={<ArrowBackIcon />}
                variant="contained"
                color="secondary"
                href="/"
                className={classes.buttons_box_font}
              >
                Continue shopping
              </Button>
              <Button
                variant="contained"
                color="primary"
                href="/checkout"
                className={classes.buttons_box_font}
              >
                Checkout
              </Button>
            </Box>
          </Container>
        ) : (
          <Box className={classes.noitems_box}>
            <img
              src={cart_icon}
              alt="cart icon"
              className={classes.noitems_box_img}
              style={{ marginBottom: '2%' }}
            />
            <Typography
              variant="h6"
              className={classes.noitems_box_text}
              style={{ marginBottom: '2%' }}
            >
              There are no products here yet
            </Typography>
            <Button variant="contained" color="primary" href="/">
              Go to catalog
            </Button>
          </Box>
        )}
      </Box>
    </>
  )
}

export default Basket
