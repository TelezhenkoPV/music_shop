import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '450px',
    height: '293px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    padding: theme.spacing(2, 4, 3),
    fontSize: '20px',
    outline: 'none',
  },
  message: {
    '& p': {
      fontSize: '14px',
      lineHeight: '19.6px',
      marginBottom: '8px',
      textAlign: 'center',
    },
  },
}))

export default useStyles
