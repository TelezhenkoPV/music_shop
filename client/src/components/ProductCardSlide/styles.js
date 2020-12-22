import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  carouselWrapper: {
    textAlign: 'center',
  },
  imageContainer: {
    height: 300,
    marginTop: 5,
  },
  image: {
    objectFit: 'scale-down',
    height: '100%',
  },
}))
