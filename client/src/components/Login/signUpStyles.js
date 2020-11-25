import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formWrapper: {
    [theme.breakpoints.down('xs')]: {
      padding: '15px',
    },
  },
  form: {
    width: '100%',
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
    marginBottom: theme.spacing(1),
  },
  marginBottomLast: {
    marginBottom: theme.spacing(1),
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
}))

export default useStyles
