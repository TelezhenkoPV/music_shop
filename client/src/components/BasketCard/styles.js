import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card_background: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  card_content: {
    border: '1px solid black',
    boxSizing: 'border-box',
    padding: '20px 40px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    [theme.breakpoints.between('xs', 'xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
    },
  },
  card_content_items: {
    [theme.breakpoints.between('xs', 'sm')]: {
      marginBottom: '19px',
    },
  },
  card_content_name: {
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '16px',
      marginBottom: '19px',
    },
  },
  card_content_totalPrice: {
    [theme.breakpoints.between('xs', 'sm')]: {
      display: 'none',
    },
  },
  card_radio: {
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    [theme.breakpoints.between('xs', 'sm')]: {
      marginBottom: '19px',
    },
  },
  count_buttons: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.between('xs', 'sm')]: {
      marginBottom: '19px',
    },
  },
  color_circle: {
    border: '2px solid black',
    width: '20px',
    height: '20px',
    borderRadius: '35%',
    marginLeft: '5px',
    [theme.breakpoints.between('xs', 'md')]: {
      marginRight: '10px',
    },
  },
}))

export default useStyles
