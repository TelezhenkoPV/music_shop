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
  searchResult: {
    width: '100%',
    display: 'flex',
    border: `1px solid ${theme.palette.primary.dark}`,
  },
  searchDropDown: {
    zIndex: '1400!important',
  },
  searchResultImage: {
    height: '50px',
    width: '50px',
    margin: theme.spacing(1, 2, 1, 1),
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  searchResultData: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
  },
}))

export default useStyles
