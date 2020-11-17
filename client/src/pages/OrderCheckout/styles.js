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
  checkoutRoot: {
    backgroundColor: theme.palette.primary.lighter,
    // flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  stepperRoot: {
    width: '100%',
  },
  stepConnectorAlternativeLabel: {
    top: 22,
  },
  stepConnectorActive: {
    '& .MuiStepConnector-line': {
      backgroundImage:
        'linear-gradient(133deg, rgba(0,0,60,1) 0%, rgba(55,78,149,1) 25%, rgba(0,0,60,1) 50%, rgba(55,78,149,1) 75%, rgba(0,0,60,1) 100%)',
    },
  },
  stepConnectorCompleted: {
    '& .MuiStepConnector-line': {
      backgroundImage:
        'linear-gradient(133deg, rgba(0,0,60,1) 0%, rgba(55,78,149,1) 25%, rgba(0,0,60,1) 50%, rgba(55,78,149,1) 75%, rgba(0,0,60,1) 100%)',
    },
  },
  stepConnectorLine: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export const useStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(136deg, rgba(17,38,103,1) 0%, rgba(0,0,60,1) 20%, rgba(17,38,103,1) 80%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(136deg, rgba(17,38,103,1) 0%, rgba(0,0,60,1) 20%, rgba(17,38,103,1) 80%)',
  },
}))

export default useStyles
