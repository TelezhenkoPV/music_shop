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
  order: {
    color: theme.palette.primary.dark,
  },
  orderData: {
    margin: theme.spacing(10, 0, 2),
    fontSize: '30px',
    fontWeight: 'bold',
  },
  orderStatusIcon: {
    fontSize: '205px',
    textAlign: 'center',
    lineHeight: 0,
  },
  orderStatusMail: {
    margin: theme.spacing(3, 0, 2),
    fontSize: '20px',
    fontWeight: 'bold',
  },
  orderStatus: {
    marginBottom: theme.spacing(2),
    fontSize: '20px',
    fontWeight: 'unset',
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  devider: {
    margin: '3px 0 1px',
  },
}))

export default useStyles
