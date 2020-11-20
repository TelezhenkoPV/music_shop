import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
  },
  productTitle: {
    textTransform: 'uppercase',
  },
  color: {
    width: 20,
    height: 20,
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  paddingStyle: {
    padding: '10px 0',
  },
}))
