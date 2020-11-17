import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formWrapper: {
    padding: '15px',
  },
  form: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
    },
  },
  marginBottom: {
    marginBottom: theme.spacing(4),
  },
  marginBottomLast: {
    marginBottom: theme.spacing(2),
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
}))

export default useStyles
