import { makeStyles } from '@material-ui/core/styles'

export const useStylesSlides = makeStyles((theme) => ({
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
      width: 'auto',
      position: 'absolute',
      right: '100px',
      bottom: 0,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },

      '& ul.thumbs': {
        padding: 0,
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

export const useStylesThumb = makeStyles((theme) => ({
  thumbWrapper: {
    height: '50px',
    backgroundColor: '#ABAEFF',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      height: '25px',
    },
    '&>img': {
      height: '100%',
      objectFit: 'cover',
    },
  },
}))

export const useStylesItem = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: '#F0F0FF',

    '&>.imageWrapper': {
      width: '100%',
      height: 'auto',

      '&>img': {
        width: '100%',
      },

      '&>.imageFilter': {
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '100%',
        background:
          'radial-gradient(circle, transparent 40%, #F0F0FF 75%), linear-gradient(to right, grey, grey)',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundBlendMode: 'normal, saturation, normal',
        opacity: '.3',
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
      background:
        'linear-gradient(to right, #F0F0FF00 0%, #F0F0FF88 50%, #F0F0FF00 100%)',

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
      background:
        'linear-gradient(to right, #F0F0FF00 0%, #F0F0FF88 50%, #F0F0FF00 100%)',
      [theme.breakpoints.down('md')]: {
        top: '70%',
        width: '80%',
        fontSize: '15px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
        // width: '100%',
        // top: '23%',
        // left: '0',
        // textAlign: 'center',
        // fontWeight: 'unset',
      },
    },
    '& .details': {
      width: '50%',
      margin: '14px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: '8px',
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
          marginRight: '10px',
          fontSize: '25px',
          fontWeight: 'bold',
        },
      },

      '&>.button': {
        width: '150px',
        padding: '10px',
        borderRadius: '10px',
        fontSize: '14px',
        [theme.breakpoints.down('sm')]: {
          width: '100px',
          padding: '5px',
          fontSize: '12px',
        },
      },
    },
  },
}))
