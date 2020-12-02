import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/react'
import Error from '../pages/Error'

export default class ErrorBoundary extends PureComponent {
  state = {
    error: '',
    eventId: '',
    errorInfo: '',
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId, errorInfo })
    })
  }

  render() {
    const { hasError, errorInfo } = this.state
    if (hasError) {
      return <Error errorInfo={errorInfo} eventId={this.state.eventId} />
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
}
