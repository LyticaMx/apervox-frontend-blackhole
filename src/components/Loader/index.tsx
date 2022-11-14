import clsx from 'clsx'
import { ReactElement } from 'react'

import { useLoader } from 'context/Loader'

import './styles.css'

const Loader = (): ReactElement => {
  const { show } = useLoader()

  const className = show ? 'flex' : 'hidden'

  return (
    <div
      className={clsx(
        'fixed top-0 z-10 w-screen h-screen bg-opacity-50 bg-black  justify-center items-center',
        className
      )}
    >
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  )
}

export default Loader
