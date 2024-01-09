import { ReactElement, useEffect } from 'react'

import Loader from 'components/Loader'
import { useRTCPlayer } from 'context/RTCPlayer'

interface Props {
  children: ReactElement
}

const FullScreenLayout = ({ children }: Props): ReactElement => {
  const { actions } = useRTCPlayer()

  useEffect(() => {
    actions?.hidePlayer()
  }, [])

  return (
    <div className="w-screen h-screen">
      {children}
      <Loader />
    </div>
  )
}

export default FullScreenLayout
