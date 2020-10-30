import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: '1rem 1rem 0.5rem 1rem',
    [theme.breakpoints.down('md')]: {
      padding: '0.5rem 0.5rem 0.25rem 0.5rem',
    },
  },
  downBar: {
    paddingBottom: '1rem',
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '7.5em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '4em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '3em',
    },
  },
  logo: {
    height: '4.5rem',
    [theme.breakpoints.down('md')]: {
      height: '4em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '3em',
    },
  },
  iconContainer: {
    ...theme.basicFlex,
  },
  headerIcon: {
    color: theme.palette.primary.contrastText,
    marginLeft: '1.25rem',
    fontSize: '3.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
    },
  },
  tab: {
    textTransform: 'capitalize',
    fontSize: '1.25rem',
  },
}))

export default useStyles
