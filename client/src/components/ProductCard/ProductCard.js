import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    display: 'flex',
    padding: 10,
    margin: 15,
    border: '1px solid #112667',
    justifyContent: 'space-between',
  },
  media: {
    width: '150px',
  },
  status: {
    border: '2px solid #112667',
    borderRadius: '20px',
    color: '#112667',
    padding: '4px 20px',
  },
  colorBlock: {
    // width: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  colorItem: {
    margin: 4,
    width: '10px',
    height: '20px',
    border: '1px solid #fff',
    borderRadius: '10px',
  },
  actionsBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  rightCardBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))

export const ProductCard = (props) => {
  const classes = useStyles()
  const { element, onClickAddProduct } = props
  const [isFavorite, setFavorite] = React.useState(false)

  const handleFavorite = () => {
    setFavorite(!isFavorite)
  }

  const onAddProduct = () => {
    const { _id, name, currentPrice } = element
    const productObj = {
      _id,
      name,
      currentPrice,
    }
    onClickAddProduct(productObj)
  }

  return (
    <Card className={classes.root}>
      <div className={classes.colorBlock}>
        <div
          className={classes.colorItem}
          style={{ background: element.color }}
        />
      </div>
      <img className={classes.media} src={'/guitar.png'} alt="guitar" />
      <CardContent>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" style={{ textTransform: 'uppercase' }}>
            {element.name}
          </Typography>
        </div>
        <Typography variant="body2">Цена: {element.currentPrice}</Typography>
        <Typography variant="body2">Код товара: {element.itemNo}</Typography>
        <Typography variant="body2">Бренд: {element.brand}</Typography>
        <Typography variant="body2">Гриф: {element.griff}</Typography>
        <Typography variant="body2">Корпус: {element.guitarBody}</Typography>
      </CardContent>
      <div className={classes.rightCardBlock}>
        <div className={classes.actionsBlock}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<ShoppingCartIcon style={{ color: '#fff' }} />}
            onClick={onAddProduct}
          >
            В корзину
          </Button>
          <IconButton aria-label="like" style={{ width: 50 }}>
            {isFavorite ? (
              <FavoriteIcon
                style={{ color: '#C22A2A' }}
                onClick={handleFavorite}
              />
            ) : (
              <FavoriteIcon onClick={handleFavorite} />
            )}
          </IconButton>
        </div>
        <Typography variant="body1" className={classes.status}>
          {element.enabled ? `В наличии: ${element.quantity}` : 'Отсутствует'}
        </Typography>
      </div>
    </Card>
  )
}
