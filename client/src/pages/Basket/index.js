import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import cart_icon from '../../assets/cart_logo.svg'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  title_box: {
    backgroundColor: '#f0f0ff',
    height: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  tabs_box: {
    backgroundColor: theme.palette.primary.main,
    height: '8%',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
  },
  noitems_box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '67%',
  },
}))

function Basket() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
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
            <Grid item xs>
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
      <Box className={classes.noitems_box}>
        <img src={cart_icon} alt="cart icon" style={{ marginBottom: '2%' }} />
        <Typography variant="h6" style={{ marginBottom: '2%' }}>
          Здесь пока нет товаров
        </Typography>
        <Button variant="contained" color="primary" href="/">
          Перейти к каталогу
        </Button>
      </Box>
    </Box>
  )
}

export default Basket
