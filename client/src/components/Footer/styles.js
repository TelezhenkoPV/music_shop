import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: '24px',
      width: '232px',
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
    margin: '10px',
  },
  logoName: {
    color: 'grey',
    width: '152px',
    textAlign: 'center',
  },
  boxLinks: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left',
  },
  titleLinks: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'white',
  },
}))

export default useStyles
