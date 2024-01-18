import FullScreenLayout from 'layout/FullScreenLayout'
import { Component, ErrorInfo, ReactNode } from 'react'
import Error from './components/Error'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error.toString(), errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <FullScreenLayout>
          <Error clearError={() => this.setState({ hasError: false })} />
        </FullScreenLayout>
      )
    }
    return this.props.children
  }
}
