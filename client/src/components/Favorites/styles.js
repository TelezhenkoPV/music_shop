import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  listWrapper: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    position: 'relative',
    margin: theme.spacing(2),
  },
  listItemClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: theme.spacing(1),
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))
export default useStyles
