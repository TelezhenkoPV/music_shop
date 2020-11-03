import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  carousel: {
    backgroundColor: '#F0F0FF',
    height: '410px',
    '& .slide': {
      backgroundColor: '#F0F0FF',
    },
  },
  arrowButton: {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: '90px',
    height: '60px',
    backgroundColor: '#ABAEFF',
    opacity: '.3',
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

export default useStyles
