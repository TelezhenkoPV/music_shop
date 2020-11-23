import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title_box: {
    backgroundColor: '#f0f0ff',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  tabs_box: {
    backgroundColor: theme.palette.primary.main,
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    marginBottom: '15px',
    [theme.breakpoints.between('xs', 'sm')]: {
      display: 'none',
    },
  },
  noitems_box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '600px',
  },
  noitems_box_img: {
    [theme.breakpoints.between('xs', 'sm')]: {
      height: '23%',
    },
  },
  noitems_box_text: {
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '19px',
    },
  },
  end_box: {},
  price_box: {
    border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '25%',
    padding: '25px 50px',
    boxSizing: 'border-box',
    [theme.breakpoints.between('xs', 'xs')]: {
      width: '100%',
    },
  },
  price_box_text: {
    [theme.breakpoints.between('xs', 'xs')]: {
      fontSize: '23px',
    },
  },
  buttons_box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '60px',
  },
  buttons_box_font: {
    [theme.breakpoints.between('xs', 'xs')]: {
      fontSize: '13px',
    },
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '30px',
  },
}))

export default useStyles
