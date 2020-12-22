import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1),
    },
  },
  info: {
    fontSize: '14px',
  },
  infoLabel: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid black',
    color: 'black',
  },
  infoLabelText: {
    fontWeight: 'bold',
  },
  infoData: {
    margin: theme.spacing(1, 2, 0),
    fontWeight: 'normal',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  listItem: {
    marginBottom: theme.spacing(2),
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  listItemError: {
    position: 'absolute',
    bottom: '-14px',
    left: '8px',
    color: 'red',
    fontSize: '0.75rem',
  },
  textField: {
    '&>.MuiInputLabel-root': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px',
      },
    },
    '&>.MuiInputBase-root': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px',
      },
    },
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      fontSize: '10px',
    },
  },
  marginBottom: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
  marginBottomLast: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  helperText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: 'translateY(100%)',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
    },
  },
  devider: {
    margin: '3px 0 1px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconChecked: {
    color: theme.palette.primary.main,
  },
  iconInline: {
    [theme.breakpoints.only('md')]: {
      padding: theme.spacing(0.5),
    },
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(0.5),
    },
  },
  creditCard: {
    margin: theme.spacing(1, 0, 0.5),
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '4px',
    backgroundColor: 'transparent',

    '& input': {
      padding: theme.spacing(1, 0, 1, 1),
      border: 'none',
      backgroundColor: 'transparent',
      font: 'inherit',
      letterSpacing: 'inherit',
      fontSize: '16px',
      [theme.breakpoints.only('md')]: {
        padding: theme.spacing(0.5, 0, 0.5, 0.5),
        fontSize: '12px',
      },
      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(0.5, 0, 0.5, 0.5),
        fontSize: '12px',
      },
    },
  },
  creditCardIcon: {
    padding: theme.spacing(0.5, 0, 0.5, 0.5),
    width: '25px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  creditCardNumberText: {
    width: '173px',
    [theme.breakpoints.only('md')]: {
      width: '130px',
    },
    [theme.breakpoints.only('xs')]: {
      width: '130px',
    },
  },
  creditCardExpiryText: {
    width: '65px',
    [theme.breakpoints.only('md')]: {
      width: '40px',
    },
    [theme.breakpoints.only('xs')]: {
      width: '40px',
    },
  },
  creditCardCVCText: {
    width: '50px',
    [theme.breakpoints.only('md')]: {
      width: '30px',
    },
    [theme.breakpoints.only('xs')]: {
      width: '30px',
    },
  },
  ErrorField: {
    border: '1px solid red',
  },
}))

export default useStyles
