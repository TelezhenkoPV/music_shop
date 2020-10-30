import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: '1rem 1rem 0.5rem 1rem',
    [theme.breakpoints.down('md')]: {
      padding: '0.5rem 0.5rem 0.25rem 0.5rem',
    },
  },
  downBar: {
    paddingBottom: '0.5rem',
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '90px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '62px',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '52px',
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
    padding: 0,
  },
  searchContainer: {
    ...theme.basicFlex,
    justifyContent: 'space-between',
    padding: '0rem 1rem 0.5rem 1rem',
    [theme.breakpoints.down('md')]: {
      padding: '0rem 0.5rem 0.25rem 0.5rem',
    },
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
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('xs')]: {
      height: '40px',
      width: '40px',
    },
  },
  drawerIconContainer: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  drawerList: {
    backgoundColor: 'red',
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
}))

export default useStyles
