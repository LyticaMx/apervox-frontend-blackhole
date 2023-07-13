import { useState } from 'react'

interface ForceUpdate {
  updatesForced: number
  forceUpdate: () => void
}

const useForceUpdate = (): ForceUpdate => {
  const [value, setValue] = useState(0)
  return {
    updatesForced: value,
    forceUpdate: () => setValue((value) => value + 1)
  }
}

export default useForceUpdate
