import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  info: {
    marginBottom: theme.spacing(4),
    fontSize: '14px',
    width: 'fit-content',
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
    justifyContent: 'flex-end',
  },
}))

export default useStyles
