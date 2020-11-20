import { makeStyles } from '@material-ui/core/styles'

export const useStylesComment = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '80%',
    margin: '0 auto',
  },
  comment: {
    width: '30%',
    minWidth: 300,
    minHeight: 100,
    margin: 10,
  },
}))
