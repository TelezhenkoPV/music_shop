import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  title_box: {
    backgroundColor: theme.palette.primary.lighter,
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  tabsRoot: {
    flexGrow: 1,
    display: 'flex',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  tabsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  tabsTitle: {
    margin: theme.spacing(2, 1),
  },
  tabsTitleNameWrapper: {
    margin: theme.spacing(1, 1, 2, 1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  tabsTitleNameLabel: {
    fontSize: '14px',
    marginBottom: theme.spacing(1),
  },
  tabsTitleName: {
    whiteSpace: 'nowrap',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  tabsTitleCart: {
    ...theme.basicFlex,
    fontSize: '10px',
  },
  tabRoot: {
    padding: theme.spacing(1),
    minHeight: theme.spacing(5),
  },
  tabsIcon: {
    marginRight: theme.spacing(4),
    color: theme.palette.primary.contrastText,
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.lighter,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  tabLabelIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
  },
  tabSelected: {
    background: `linear-gradient(115deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.lighter} 30%)`,
    color: theme.palette.grays.black,
    [theme.breakpoints.down('sm')]: {
      background: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  },
  tabPanel: {
    backgroundColor: theme.palette.primary.lighter,
    width: '100%',
  },
  tabPanelPaper: {
    height: '100%',
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
