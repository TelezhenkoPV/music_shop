import React from 'react'
import PropTypes from 'prop-types'
import useStyles from './styles'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

export default function ProductPreview(props) {
  const classes = useStyles()
  const { img, name, price, color, totalCount, error } = props

  return (
    <div className={classes.productPreview}>
      <Box className={classes.card_wrapper}>
        <Box
          className={classes.cardImage}
          style={{ backgroundImage: `url(/${img[0]})` }}
        />
        <Box className={classes.card_content}>
          <Typography className={classes.card_name}>{name}</Typography>
          <Box className={classes.flex_styled}>
            <Box className={classes.card_radio}>
              <Typography variant="subtitle1">Color</Typography>
              <div
                className={classes.color_circle}
                style={{ backgroundColor: `${color}` }}
              />
            </Box>
          </Box>
          <Box className={classes.flex_styled}>
            <Typography>{totalCount} pc</Typography>
            <Typography>${price}</Typography>
          </Box>
        </Box>
      </Box>
      {error && <Typography className={classes.error}>{error}</Typography>}
    </div>
  )
}

ProductPreview.propTypes = {
  img: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  error: PropTypes.string,
}
