import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    justifyContent: 'flex-end',
  },
  iconChecked: {
    color: theme.palette.primary.main,
  },
  // creditCardNumber: {
  //   flexGrow: 1,
  //   fontSize: '14px',
  // },
  // creditCardExpiryDate: {
  //   width: '70px',
  //   minWidth: '70px',
  //   fontSize: '14px',
  // },
  // creditCardCVC: {
  //   width: '65px',
  //   minWidth: '65px',
  //   fontSize: '14px',
  // }
}))

export default useStyles
