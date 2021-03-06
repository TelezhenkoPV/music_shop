import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 270,
    display: 'flex',
    flexWrap: 'wrap',
    padding: 10,
    marginBottom: 15,
    marginLeft: 15,
    border: '1px solid #112667',
    justifyContent: 'space-between',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  media: {
    width: '150px',
  },
  status: {
    border: '2px solid #112667',
    borderRadius: '20px',
    color: '#112667',
    padding: '4px 20px',
  },
  colorBlock: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  colorItem: {
    margin: 4,
    width: '10px',
    height: '20px',
    border: '1px solid #fff',
    borderRadius: '10px',
  },
  actionsBlock: {
    textAlign: 'center',
  },
  rightCardBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))
