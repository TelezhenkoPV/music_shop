import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useStylesItem } from './styles'

export const CarouselItem = ({ item }) => {
  const classes = useStylesItem()
  const history = useHistory()

  const {
    title,
    description,
    imageUrl,
    slideUrl = '/',
    product: { previousPrice = null, currentPrice = null } = {},
  } = item

  const onBtnClick = () => {
    slideUrl ? history.push(slideUrl) : console.log('There is no slide URL')
  }

  return (
    <div className={classes.root}>
      <div className="imageWrapper">
        <img src={imageUrl} alt={title} />
        <div className="imageFilter"></div>
      </div>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="details">
        <div className="price">
          {previousPrice && (
            <div className="previousPrice">₴{previousPrice}</div>
          )}
          {currentPrice && <div className="currentPrice">₴{currentPrice}</div>}
        </div>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={onBtnClick}
        >
          Перейти
        </Button>
      </div>
    </div>
  )
}
