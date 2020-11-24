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
  fildGroupTitle: {
    padding: '8px',
    margin: '4px -4px',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  info: {
    fontSize: '14px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  infoLabel: {
    border: `1px solid ${theme.palette.primary.contrastText}`,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  infoData: {
    border: `1px solid ${theme.palette.primary.light}`,
  },
  infoText: {
    fontSize: '14px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  iconInline: {
    margin: theme.spacing(0, 1),
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
