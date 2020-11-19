import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#112667',
      light: '#474e96',
      dark: '#00003c',
      lighter: '#f0f0ff',
      contrastText: '#ffffff ',
    },
    secondary: {
      main: '#0369b4',
      light: '#5696e7',
      dark: '#003f84',
      contrastText: '#ffffff ',
    },
    grays: {
      gray: '#9E9E9E',
      blueGary: '#607D8B',
      black: '#040404',
    },
    green: {
      main: '#4CAF50',
      light: '#8BC34A',
      dark: '#009688',
      contrastText: '#ffffff',
    },
  },
  basicFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
