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
      maxWidth: '439px',
    },
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'white',
  },
  links: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
    color: 'white',
    textDecoration: 'none',
    fontSize: '13px',
    padding: '3px',
  },
  gridItem: {
    [theme.breakpoints.down('sm')]: {
      padding: '40px 0px',
      width: '100%',
    },
    padding: '40px',
  },
  icon: {
    [theme.breakpoints.down('sm')]: {
      margin: '7px',
    },
    margin: '2px',
    color: '#fff',
  },
}))

export default useStyles
