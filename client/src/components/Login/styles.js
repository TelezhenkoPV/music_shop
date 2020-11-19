import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: '0px 0px 0px 0px',
    width: '100%',
  },
  Tab: {
    color: theme.palette.grays.black,
    flexDirection: 'row',
    boxShadow: 'inset 0px -6px 8px -5px rgba(0,0,0,1)',
    fontWeight: 'bold',
    fontSize: '16px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
    },
  },
  labelIcon: {
    [theme.breakpoints.down('xs')]: {
      minHeight: '0',
    },
  },
  iconLabelWrapper: {
    flexDirection: 'row',
  },
  tabIcon: {
    marginRight: theme.spacing(1),
  },
  selectedTab: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}))

export default useStyles
