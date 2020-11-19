import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBox: {
    backgroundColor: '#112667',
    width: '417px',
    height: '41px',
    textAlign: 'center',
    top: '26px',
    position: 'relative',
    right: '5px',
    [theme.breakpoints.down('md')]: {
      width: '300px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '200px',
    },
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    padding: '5px',
  },
  goToBox: {
    position: 'relative',
    backgroundColor: '#0369B4',
    width: '218px',
    height: '51px',
    textAlign: 'center',
    padding: '10px',
    top: '-56px',
    left: '340px',
    [theme.breakpoints.down('md')]: {
      left: '183px',
      height: '40px',
      top: '-45px',
      padding: '7px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '117px',
    },
  },
  img: {
    [theme.breakpoints.down('md')]: {
      width: '400px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    width: '557px',
  },
  goTo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  categoriesTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    border: '1px solid #112667',
    margin: '7px 20px',
    width: '30vw',
    backgroundColor: '#112667',
  },
}))

export default useStyles
