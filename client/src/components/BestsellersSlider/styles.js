import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  categoriesTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    border: '1px solid #112667',
    margin: '7px 20px',
    width: '30vw',
    backgroundColor: '#112667',
  },
  largeSlider: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  mediumSlider: {
    display: 'none',
    [theme.breakpoints.only('md')]: {
      display: 'block',
    },
  },
  smallSlider: {
    display: 'none',
    [theme.breakpoints.only('sm')]: {
      display: 'block',
    },
  },
  tinySlider: {
    display: 'none',
    [theme.breakpoints.only('xs')]: {
      display: 'block',
    },
  },
}))

export default useStyles
