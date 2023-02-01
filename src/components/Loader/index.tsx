import clsx from 'clsx'
import { ReactElement } from 'react'

import { useLoader } from 'context/Loader'

import './styles.css'
import { zIndex } from 'constants/classes'

const Loader = (): ReactElement => {
  const { show } = useLoader()

  const className = show ? 'flex' : 'hidden'

  return (
    <div
      className={clsx(
        'fixed top-0 w-screen h-screen bg-opacity-50 bg-black justify-center items-center',
        className
      )}
      style={{
        zIndex: zIndex.loader
      }}
    >
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  )
}

export default Loader
