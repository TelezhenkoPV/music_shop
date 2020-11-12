import { fade, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  searchWrapper: {
    display: 'flex',
    flexGrow: 2,
  },
  searchBar: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
  input: {
    color: '#ffffff !important',
  },
  iconButton: {
    color: '#ffffff !important',
  },
  clearIcon: {
    color: '#ffffff',
  },
  searchDropDown: {
    zIndex: '1400!important',
  },
}))

export default useStyles
