import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1),
    },
  },
  info: {
    marginBottom: theme.spacing(4),
    fontSize: '14px',
  },
  infoLabel: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottom: '1px solid black',
    color: 'black',
  },
  infoLabelText: {
    fontWeight: 'bold',
  },
  infoData: {
    margin: theme.spacing(1, 2, 0),
    fontWeight: 'normal',
  },
  iconInline: {
    margin: theme.spacing(0, 2),
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}))

export default useStyles
