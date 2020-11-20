import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '&>.MuiDivider-root': {
      flexGrow: 1,
      height: '2px',
      backgroundColor: theme.palette.primary.dark,
    },
  },
  tabs: {
    margin: theme.spacing(2, 0),
  },
  tabRoot: {
    border: `1px solid ${theme.palette.primary.dark}`,
    flexGrow: 1,
  },
  tabSelected: {
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
}))

export default useStyles
