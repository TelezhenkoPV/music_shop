import { makeStyles } from '@material-ui/core/styles'
import guitarHeader from '../../assets/guitar-header.png'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  filterWrapper: {
    padding: 15,
  },
  filterBlock: {
    width: '30%',
    height: '30%',
    padding: 15,
  },
  productBlock: {
    width: '65%',
  },
  mainContainer: {
    width: 1200,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  pageHeader: {
    width: '100%',
    backgroundImage: `url(${guitarHeader})`,
    color: '#fff',
    marginBottom: '40px',
  },
}))
