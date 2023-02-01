import { ReactElement } from 'react'

import Loader from 'components/Loader'

interface Props {
  children: ReactElement
}

const FullScreenLayout = ({ children }: Props): ReactElement => {
  return (
    <div className="w-screen h-screen">
      {children}
      <Loader />
    </div>
  )
}

export default FullScreenLayout
