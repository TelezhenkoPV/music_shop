import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import Container from '@material-ui/core/Container'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Grid from '@material-ui/core/Grid'
import useStyles from './styles'

const BasketCard = (props) => {
  const classes = useStyles()

  const {
    id,
    img,
    name,
    price,
    onRemove,
    totalPrice,
    totalCount,
    onPlus,
    onMinus,
    color,
  } = props

  const handleRemoveClick = () => {
    onRemove(id)
  }

  const handlePlusItem = () => {
    onPlus(id)
  }

  const handleMinusItem = () => {
    onMinus(id)
  }

  return (
    <Container maxWidth="xl">
      <Box className={classes.card_background}>
        <IconButton
          aria-label="delete"
          style={{ marginRight: '5px' }}
          onClick={handleRemoveClick}
        >
          <ClearIcon color="primary" style={{ fontSize: 35 }} />
        </IconButton>
        <Grid className={classes.card_content} container direction="row">
          <Grid item xs={2}>
            <img
              className={classes.card_content_items}
              style={{ height: 120 }}
              src={`/${img[0]}`}
              alt="img"
            />
          </Grid>
          <Grid item xs={3} style={{ maxWidth: '100%' }}>
            <Typography
              className={classes.card_content_name}
              style={{ textTransform: 'uppercase' }}
              variant="h6"
            >
              {name}
            </Typography>
          </Grid>
          <Grid item xs>
            <Box className={classes.card_radio}>
              <Typography variant="subtitle1">Color</Typography>
              <div
                className={classes.color_circle}
                style={{ backgroundColor: `${color}` }}
              />
            </Box>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" className={classes.card_content_items}>
              ${price}
            </Typography>
          </Grid>
          <Grid item xs>
            <Box className={classes.count_buttons}>
              <IconButton aria-label="remove" onClick={handleMinusItem}>
                <RemoveIcon color="primary" style={{ fontSize: 20 }} />
              </IconButton>
              <Typography variant="h6">{totalCount}</Typography>
              <IconButton aria-label="add" onClick={handlePlusItem}>
                <AddIcon color="primary" style={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs>
            <Typography
              variant="h5"
              className={classes.card_content_totalPrice}
            >
              $ {totalPrice}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

BasketCard.propTypes = {
  id: PropTypes.string,
  img: PropTypes.array,
  name: PropTypes.string,
  price: PropTypes.number,
  onRemove: PropTypes.func,
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number,
  onPlus: PropTypes.func,
  onMinus: PropTypes.func,
  color: PropTypes.string,
}

export default BasketCard
