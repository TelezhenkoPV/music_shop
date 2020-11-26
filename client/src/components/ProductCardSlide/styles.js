import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  carouselWrapper: {
    maxWidth: 150,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  carouselWrapperMain: {
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid #818BB3',
    padding: 20,
  },
}))
