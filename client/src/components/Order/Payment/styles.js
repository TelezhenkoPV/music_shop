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
  paymentMethodRoot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paymentMethodWrapper: {
    margin: theme.spacing(2, 4),
  },
  paymentMethod: {
    minWidth: '150px',
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  paymentMethodControl: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: '64px',
    height: '64px',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: '50%',
  },
  radioRoot: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  radioIcon: {
    width: 16,
    height: 16,
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.dark,
  },
}))

export default useStyles
