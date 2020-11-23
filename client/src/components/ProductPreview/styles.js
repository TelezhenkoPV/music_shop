import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card_wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottom: '3px solid purple',
    boxSizing: 'border-box',
    padding: '20px',
  },
  card_content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
  },
  card_name: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 17,
    width: '120%',
  },
  color_circle: {
    border: '2px solid black',
    width: '20px',
    height: '20px',
    borderRadius: '35%',
    marginLeft: '5px',
  },
  card_radio: {
    display: 'flex',
    alignItems: 'center',
  },
  flex_styled: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  card_link_delete: {
    textDecoration: 'underline',
    color: 'purple',
    cursor: 'pointer',
  },
}))

export default useStyles
