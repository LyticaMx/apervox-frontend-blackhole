import { DependencyList, RefObject, useCallback, useEffect } from 'react'

const useProgress = (
  ref: RefObject<HTMLInputElement>,
  deps?: DependencyList
): void => {
  const handleInput = useCallback(() => {
    if (!ref.current) return
    ref.current.style.setProperty('--value', ref.current.value)
  }, [])

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.setProperty('--value', ref.current.value)
    ref.current.style.setProperty(
      '--min',
      ref.current.min === '' ? '0' : ref.current.min
    )
    ref.current.style.setProperty(
      '--max',
      ref.current.max === '' ? '100' : ref.current.max
    )

    ref.current.addEventListener('input', handleInput)
    return () => {
      ref.current?.removeEventListener('input', handleInput)
    }
  }, [deps])
}

export default useProgress
