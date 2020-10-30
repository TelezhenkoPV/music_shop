import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  searchBar: {
    margin: '0 auto',
    minWidth: 700,
    [theme.breakpoints.down('md')]: {
      minWidth: 500,
      height: 40,
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
      height: 35,
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 200,
    },
  },
}))

export default useStyles
