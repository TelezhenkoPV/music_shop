import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'

import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ProductCardSmall from '../ProductCardSmall'
import {
  getFavorites,
  toggleFavorites,
} from '../../store/favorites/favoritesActions'
import {
  favoriteProducts,
  getIsLoading,
} from '../../store/favorites/favoritesSelectors'

export default function Favorites() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const favorites = useSelector(favoriteProducts)
  const isLoading = useSelector(getIsLoading)

  useEffect(() => {
    dispatch(getFavorites())
  }, [dispatch])

  const handleClick = (id) => {
    dispatch(toggleFavorites(true, id))
  }

  const favoritesCards = favorites.map((product) => (
    <div key={product._id} className={classes.listItem}>
      <ProductCardSmall product={product} topRightBadge={null} />
      <Tooltip
        classes={{ tooltip: classes.tooltip }}
        title="Remove from favorites"
        placement="top-end"
        arrow
        TransitionComponent={Zoom}
      >
        <IconButton
          className={classes.listItemClose}
          onClick={() => handleClick(product._id)}
        >
          <CloseIcon color="primary" fontSize="large" />
        </IconButton>
      </Tooltip>
    </div>
  ))

  return (
    <div className={classes.root}>
      <div className={classes.listWrapper}>
        <div className={classes.list}>
          {isLoading ? <CircularProgress size={100} /> : favoritesCards}
        </div>
      </div>
    </div>
  )
}
