import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '&>.MuiDivider-root': {
      flexGrow: 1,
      height: '2px',
      backgroundColor: theme.palette.primary.dark,
    },
  },
  orderData: {
    margin: theme.spacing(1, 1, 2, 1),
  },
  button: {
    margin: theme.spacing(1),
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
}))

export default useStyles
