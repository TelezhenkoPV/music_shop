import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store/configureStore'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme/Theme'
import { SnackbarProvider } from 'notistack'
import { PersistGate } from 'redux-persist/integration/react'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import ErrorBoundary from './ErrorBoundary'

Sentry.init({
  dsn:
    'https://b4f69a9d94854c54bc86777caa983f68@o483901.ingest.sentry.io/5536443',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={10}>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </SnackbarProvider>
          </ThemeProvider>
        </CssBaseline>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
