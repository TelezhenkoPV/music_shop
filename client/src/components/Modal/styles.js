import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '2000!important',
  },
  paper: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    padding: '0px',
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
