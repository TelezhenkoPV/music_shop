import React from 'react'
import PropTypes from 'prop-types'
import useStyles from './styles'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

export default function ProductPreview(props) {
  const classes = useStyles()
  const { img, id, name, price, color, onRemove, totalCount } = props

  const handleRemoveClick = () => {
    onRemove(id)
  }

  return (
    <Box className={classes.card_wrapper}>
      <Box>
        <img style={{ height: 90 }} src={`/${img[0]}`} alt="img" />
      </Box>
      <Box className={classes.card_content}>
        <Typography className={classes.card_name}>{name}</Typography>
        <Box className={classes.flex_styled} style={{ marginBottom: 40 }}>
          <Box className={classes.card_radio}>
            <Typography variant="subtitle1">Color</Typography>
            <div
              className={classes.color_circle}
              style={{ backgroundColor: `${color}` }}
            />
          </Box>
          <Typography
            className={classes.card_link_delete}
            onClick={handleRemoveClick}
          >
            Delete
          </Typography>
        </Box>
        <Box className={classes.flex_styled}>
          <Typography>{totalCount} pc</Typography>
          <Typography>${price}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

ProductPreview.propTypes = {
  img: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}
