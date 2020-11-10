import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    minWidth: '320px',
    backgroundColor: theme.palette.primary.dark,
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    marginTop: '72px',
    backgroundColor: theme.palette.primary.main,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
    color: theme.palette.primary.contrastText,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  dividerThin: {
    borderBottom: '1px solid #ffffff20',
  },
  dividerThik: {
    borderBottom: '2px solid #ffffff20',
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  drawerMenuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    height: '72px',
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  searchAppBar: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      margin: theme.spacing(0, 3),
      width: 'auto',
      flexGrow: 2,
      position: 'relative',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerTitleWrapper: {
    textAlign: 'left',
    textTransform: 'uppercase',
    paddingLeft: '7px',
  },
  customerFirstName: {
    fontSize: '0.6rem',
  },
  customerLastName: {
    fontSize: '0.7rem',
  },
  menuCustomerTitleWrapper: {
    textAlign: 'center',
    textTransform: 'uppercase',
    padding: theme.spacing(1, 2),
  },
  customerFullName: {
    fontSize: '0.8rem',
  },
  categoryToolbar: {
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  tab: {
    minWidth: 0,
    width: '150px',
  },
  selectedTab: {
    backgroundColor: theme.palette.primary.dark,
  },
  searchPopper: {
    zIndex: theme.zIndex.drawer + 2,
  },
  searchPopperContent: {
    width: 'calc(100vw - 50px)',
    height: '62px',
    zIndex: theme.zIndex.drawer + 2,
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sectionExtraSmall: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))

export default useStyles
