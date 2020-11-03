import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: '#F0F0FF',

    '&>.imageWrapper': {
      width: '100%',
      height: 'auto',

      '&>img': {
        width: '100%',
      },
    },
    '& .title': {
      position: 'absolute',
      top: '10%',
      left: '95px',
      width: '50%',
      textAlign: 'left',
      fontSize: '40px',
      fontWeight: 'bold',
      letterSpacing: '2px',

      [theme.breakpoints.down('md')]: {
        width: '80%',
        fontSize: '30px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        left: '0',
        textAlign: 'center',
        fontSize: '15px',
        letterSpacing: 'unset',
      },
    },
    '& .description': {
      position: 'absolute',
      top: '60%',
      left: '95px',
      width: '50%',
      textAlign: 'left',
      fontSize: '20px',
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        top: '70%',
        width: '80%',
        fontSize: '15px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        top: '23%',
        left: '0',
        textAlign: 'center',
        fontWeight: 'unset',
      },
    },
    '& .details': {
      width: '40%',
      margin: '14px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: '10px',
      left: '95px',
      textAlign: 'left',
      [theme.breakpoints.down('xs')]: {
        width: '95%',
        bottom: '0',
        left: '2.5%',
      },

      '&>.price': {
        display: 'flex',
        alignItems: 'center',

        '&>.previousPrice': {
          position: 'relative',
          display: 'inline-block',
          marginRight: '10px',
          fontSize: '20px',

          '&::before': {
            position: 'absolute',
            left: '8px',
            width: 'calc(100% - 10px)',
            height: '50%',
            content: '""',
            borderBottom: '2px solid black',
            transform: 'rotate(-20deg)',
            opacity: '0.5',
          },
        },

        '&>.currentPrice': {
          fontSize: '25px',
          fontWeight: 'bold',
        },
      },

      '&>.button': {
        width: '150px',
        padding: '10px',
        borderRadius: '10px',
        fontSize: '.875rem',
        zIndex: 3,
        [theme.breakpoints.down('sm')]: {
          width: '100px',
          padding: '5px',
          fontSize: '.8rem',
        },
        [theme.breakpoints.down('xs')]: {
          width: '80px',
          padding: '5px',
          fontSize: '.7rem',
        },
      },
    },
  },
}))

export const CarouselItem = ({ item }) => {
  const history = useHistory()
  const {
    title,
    description,
    imageUrl,
    product: { previousPrice, currentPrice, productUrl },
  } = item

  const onBtnClick = () => {
    productUrl
      ? history.push(productUrl)
      : console.log('There is no product URL')
  }

  const classes = useStyles(imageUrl)
  return (
    <div className={classes.root}>
      <div className="imageWrapper">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="details">
        <div className="price">
          <div className="previousPrice">₴{previousPrice}</div>
          <div className="currentPrice">₴{currentPrice}</div>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={onBtnClick}
        >
          Детали
        </Button>
      </div>
    </div>
  )
}
