import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  background_box: {
    width: '100%',
    border: '3px solid purple',
  },
  title_box: {
    boxSizing: 'border-box',
    padding: '5px 20px',
    borderBottom: '3px solid purple',
  },
  totalPrice_box: {
    boxSizing: 'border-box',
    padding: '22px',
    borderTop: '3px solid purple',
  },
}))

export default useStyles
