import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export default useStyles
