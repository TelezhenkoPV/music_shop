import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  searchBar: {
    margin: '0 auto',
    minWidth: 800,
    [theme.breakpoints.down('md')]: {
      minWidth: 650,
      height: 40,
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 485,
      height: 35,
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 300,
      height: 30,
    },
  },
}))

export default useStyles
