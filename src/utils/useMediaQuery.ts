import { useState, useEffect } from 'react'

import { screens } from 'constants/classes'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | '2xl'

export const useWindowSize = (breakpoint: Breakpoint): boolean => {
  const [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    const handleResize = (): any => {
      setIsMatch(window.innerWidth > screens[breakpoint])
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMatch
}
