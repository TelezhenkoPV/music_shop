import React, { useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import useStyles from './styles'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import IconButton from '@material-ui/core/IconButton'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { CarouselItem } from './CarouselItem'
import { CarouselThumb } from './CarouselThumb'
import { getSlides } from '../../store/slides/slidesActions'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '320px',
  },
  carousel: {
    position: 'relative',
    backgroundColor: '#F0F0FF',
    '& .slide': {
      backgroundColor: '#F0F0FF',
    },
    '& .carousel:not(.carousel-slider)': {
      width: '40%',
      position: 'absolute',
      right: '100px',
      bottom: 0,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },

      '& .thumbs-wrapper': {
        margin: 0,
        textAlign: 'right',

        '& .thumb': {
          marginRight: '10px',
          border: '1px solid #898CDD',
          backgroundColor: '#ABAEFF',
        },

        '& .thumb.selected': {
          boxShadow: '0 0 10px 0 #898CDD inset, 0 0 10px 4px #898CDD',
        },
        '& .thumb:hover': {
          border: '2px solid #898CDD',
        },
      },
      [theme.breakpoints.down('md')]: {
        right: '0',
      },
    },
  },
  arrowButton: {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: '90px',
    height: '60px',
    backgroundColor: '#ABAEFF',
    opacity: '.2',
    transition: 'opacity 500ms',
    '&:hover': {
      backgroundColor: '#ABAEFF',
      opacity: '.8',
    },
  },
  arrowButtonNext: {
    borderRadius: '10px 0 0 10px',
    right: '0',
  },
  arrowButtonPrev: {
    borderRadius: '0 10px 10px 0',
    left: '0',
  },
  iconRoot: {
    fontSize: '5rem',
    color: '#112667',
  },
}))

export default function Slides({ items }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  // const history = useHistory()

  const onItemClicked = (itemId) => {
    console.log('Item clicked', itemId)
    // productUrl ? history.push(productUrl) : console.log('There is no product URL')
  }

  useEffect(() => {
    dispatch(getSlides())
  }, [dispatch])

  const carouselItems = items.map((item, i) => (
    <CarouselItem key={i} item={item} />
  ))

  return (
    <div className={classes.root}>
      <Carousel
        infiniteLoop
        useKeyboardArrows
        // autoPlay
        showArrows={
          useMediaQuery(useTheme().breakpoints.down('xs')) ? false : null
        }
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
              aria-label="Предыдущий"
              variant="contained"
              onClick={onClickHandler}
              title="Предыдущий слайд"
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
              aria-label="Следующий"
              variant="contained"
              onClick={onClickHandler}
              title={'Следующий слайд'}
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
