import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  newBox: {
    backgroundColor: '#112667',
    width: '59px',
    height: '30px',
    textAlign: 'center',
    position: 'relative',
    top: '30px',
    left: '190px',
  },
  new: {
    fontSize: '9px',
    fontWeight: 'bold',
    color: 'white',
    padding: '15%',
  },
  imgBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '250px',
    height: '230px',
    border: '1px solid #112667',
  },
  img: {
    maxWidth: '225px',
    maxHeight: '210px',
  },
  detailsBox: {
    height: '92px',
    backgroundColor: '#112667',
    width: '250px',
  },
  prodCategory: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.47)',
    padding: '3px',
  },
  prodName: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white',
    padding: '3px',
  },
  priceBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  prodPrevPrice: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.47)',
    textDecoration: 'line-through',
    padding: '3px',
  },
  prodCurrPrice: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white',
    padding: '3px',
  },
}))

export default useStyles
