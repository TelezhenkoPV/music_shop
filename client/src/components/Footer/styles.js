import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '356px',
    width: '100%',
    backgroundColor: theme.palette.primary.dark,
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: '24px',
    },
    padding: '72px',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '24px',
  },
  logo: {
    width: '50px',
  },
  logoName: {
    color: 'grey',
    width: '152px',
    textAlign: 'center',
  },
}))

export default useStyles
