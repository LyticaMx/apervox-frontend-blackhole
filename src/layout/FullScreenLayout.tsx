import { ReactElement, useEffect } from 'react'

import Loader from 'components/Loader'
import { useRTCPlayer } from 'context/RTCPlayer'
import { ErrorBoundary } from 'components/ErrorBoundary'

interface Props {
  children: ReactElement
}

const FullScreenLayout = ({ children }: Props): ReactElement => {
  const { actions } = useRTCPlayer()

  useEffect(() => {
    actions?.hidePlayer()
  }, [])

  return (
    <ErrorBoundary>
      <div className="w-screen h-screen">
        {children}
        <Loader />
      </div>
    </ErrorBoundary>
  )
}

export default FullScreenLayout
