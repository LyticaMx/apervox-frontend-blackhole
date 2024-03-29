import { ReactElement, useEffect } from 'react'

import Loader from 'components/Loader'
import backgroundImage from 'assets/Images/auth3.jpeg'
import { useRTCPlayer } from 'context/RTCPlayer'
import { ErrorBoundary } from 'components/ErrorBoundary'

interface Props {
  children: ReactElement
}

const AuthLayout = ({ children }: Props): ReactElement => {
  const { actions } = useRTCPlayer()

  useEffect(() => {
    actions?.hidePlayer()
  }, [])

  return (
    <ErrorBoundary>
      <div className="relative flex min-h-full justify-center md:px-12 lg:px-0 h-screen">
        <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            {children}
          </div>
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={backgroundImage}
            alt=""
          />
        </div>
        <Loader />
      </div>
    </ErrorBoundary>
  )
}

export default AuthLayout
