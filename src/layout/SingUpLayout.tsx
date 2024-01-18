import { ReactElement } from 'react'
import TextLogo from 'assets/Icons/VoiceprintLogo'
import { ErrorBoundary } from 'components/ErrorBoundary'

interface Props {
  children: ReactElement
}

const SingUpLayout = ({ children }: Props): ReactElement => {
  return (
    <ErrorBoundary>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="w-full max-w-screen-md bg-white rounded drop-shadow-md py-5 divide-solid divide-y px-10">
          <div className="flex items-center justify-center py-5">
            <TextLogo />
          </div>
          <div className=" py-10  ">{children}</div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default SingUpLayout
