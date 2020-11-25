import { makeStyles } from '@material-ui/core/styles'

export const useStylesYoutubeVideo = makeStyles((theme) => ({
  youtubeVideo: {
    display: 'flex',
    margin: '0 auto',
    width: '700px',
    height: '450px',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      height: '40%',
      minWidth: 320,
    },
  },
}))
