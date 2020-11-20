import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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

const useStyles = makeStyles((theme) => ({
  title_box: {
    backgroundColor: '#f0f0ff',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  tabs_box: {
    backgroundColor: theme.palette.primary.main,
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    marginBottom: '15px',
  },
  noitems_box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '600px',
  },
  end_box: {},
  price_box: {
    border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '25%',
    padding: '25px 50px',
    boxSizing: 'border-box',
  },
  buttons_box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '60px',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '30px',
  },
}))

function Basket() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const basket = useSelector(basketSelector)
  const totalPrice = useSelector(totalPriceSelector)

  const totalCount = useSelector(totalCountSelector)

  const onRemoveItem = (_id) => {
    dispatch(removeCartItem(_id))
  }

  const onPlusItem = (_id) => {
    dispatch(plusItem(_id))
  }

  const onMinusItem = (_id) => {
    dispatch(minusItem(_id))
  }

  const basketCard = () => {
    return basket.map((elem) => {
      return (
        <BasketCard
          key={elem._id}
          img={elem.imageUrls}
          id={elem._id}
          color={elem.color}
          name={elem.name}
          price={elem.currentPrice}
          onRemove={onRemoveItem}
          totalPrice={totalPrice}
          totalCount={totalCount}
          onMinus={onMinusItem}
          onPlus={onPlusItem}
        />
      )
    })
  }

  return (
    <Box>
      <Box className={classes.title_box}>
        <Typography variant="h4" style={{ marginBottom: '1%' }}>
          Корзина
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Главная
          </Link>
          <Link color="textPrimary" href="/basket" aria-current="page">
            Корзина
          </Link>
        </Breadcrumbs>
      </Box>
      <Box className={classes.tabs_box}>
        <Container>
          <Grid container direction="row">
            <Grid item xs={5}>
              <Typography variant="subtitle1">Название</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="subtitle1">Цвет</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1">Цена</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1">Количество</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1">Итоговая цена</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {basketCard()}

      {totalCount ? (
        <Container maxWidth="xl" className={classes.end_box}>
          <div className={classes.wrapper}>
            <Box className={classes.price_box}>
              <Typography variant="h5">Итого</Typography>
              <Typography variant="h4">${totalPrice}</Typography>
            </Box>
          </div>
          <Box className={classes.buttons_box}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="contained"
              color="secondary"
              href="/"
            >
              Продолжить покупки
            </Button>
            <Button variant="contained" color="primary" href="/checkout">
              Оформить заказ
            </Button>
          </Box>
        </Container>
      ) : (
        <Box className={classes.noitems_box}>
          <img src={cart_icon} alt="cart icon" style={{ marginBottom: '2%' }} />
          <Typography variant="h6" style={{ marginBottom: '2%' }}>
            Здесь пока нет товаров
          </Typography>
          <Button variant="contained" color="primary" href="/">
            Перейти к каталогу
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Basket
