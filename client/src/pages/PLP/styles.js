import { makeStyles } from '@material-ui/core/styles'
import guitarHeader from '../../assets/guitar-header.png'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filterWrapper: {
    padding: 15,
  },
  filterBlock: {
    width: 360,
    padding: 15,
  },
  productBlock: {
    width: '60%',
    minWidth: 350,
    display: 'flex',
    justifyContent: 'center',
  },
  mainContainer: {
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  pageHeader: {
    width: '100%',
    backgroundImage: `url(${guitarHeader})`,
    color: '#fff',
    marginBottom: '40px',
  },
}))
