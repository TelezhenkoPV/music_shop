import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  productPreview: {
    borderBottom: `3px solid ${theme.palette.primary.dark}`,
  },
  card_wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '10px',
  },
  card_content: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  cardImage: {
    height: 100,
    width: 100,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  card_name: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 17,
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
  error: {
    padding: theme.spacing(1),
    color: 'red',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))

export default useStyles
