import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme/Theme'
import { SnackbarProvider } from 'notistack'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={10}>
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </CssBaseline>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
