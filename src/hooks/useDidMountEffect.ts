import React, { useEffect, useRef } from 'react'

/**
 * This hook avoid the first render, like the componentDidMount life state of class components
 * @param {React.EffectCallback} func The function to use in useEffect hook
 * @param {React.DependencyList} deps Dependencies of useEffec hook
 */
export const useDidMountEffect = (
  func: React.EffectCallback,
  deps: React.DependencyList
): void => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) func()
    else didMount.current = true
  }, deps)
}
