import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { CarouselItem } from './CarouselItem'
import { CarouselThumb } from './CarouselThumb'
import { useStylesSlides } from './styles'

export default function Slides({ items }) {
  const classes = useStylesSlides()
  const history = useHistory()

  const onItemClicked = (itemId) => {
    const { slideUrl } = items[itemId]
    slideUrl ? history.push(slideUrl) : console.log('There is no slide URL')
  }

  const carouselItems = items.map((item, i) => (
    <CarouselItem key={i} item={item} />
  ))

  return (
    <div className={classes.root}>
      <Carousel
        infiniteLoop
        useKeyboardArrows
        autoPlay
        showArrows={!useMediaQuery(useTheme().breakpoints.down('xs'))}
        showStatus={false}
        showIndicators={false}
        thumbWidth={
          useMediaQuery(useTheme().breakpoints.down('sm')) ? '40px' : '85px'
        }
        interval={5000}
        className={classes.carousel}
        enterClass="animated fadeIn faster"
        exitClass="animated fadeOut faster"
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <IconButton
              aria-label="Prev"
              variant="contained"
              onClick={onClickHandler}
              title="Previous"
              className={classes.arrowButtonPrev}
              classes={{ root: classes.arrowButton }}
            >
              <NavigateBeforeIcon classes={{ root: classes.iconRoot }} />
            </IconButton>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <IconButton
              aria-label="Next"
              variant="contained"
              onClick={onClickHandler}
              title={'Next'}
              className={classes.arrowButtonNext}
              classes={{ root: classes.arrowButton }}
            >
              <NavigateNextIcon classes={{ root: classes.iconRoot }} />
            </IconButton>
          )
        }
        renderThumbs={(thumbs) =>
          thumbs.map((thumb, i) => (
            <CarouselThumb key={i} item={thumb.props.item} />
          ))
        }
        onClickItem={onItemClicked}
      >
        {carouselItems}
      </Carousel>
    </div>
  )
}

Slides.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      customId: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      slideUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
}
