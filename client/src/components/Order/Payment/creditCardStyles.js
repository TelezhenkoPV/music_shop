import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  creditCardTitle: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  creditCardWrapper: {
    padding: theme.spacing(2),
  },
  creditCard: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  creditCardControl: {
    margin: theme.spacing(2),
    minWidth: '160px',
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export default useStyles
