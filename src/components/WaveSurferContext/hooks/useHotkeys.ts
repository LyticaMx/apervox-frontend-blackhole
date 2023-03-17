import { useEffect, useCallback } from 'react'
import hotkeys from 'hotkeys-js'

export const useHotkeys = (controls: any): void => {
  const bindKeys = useCallback(() => {
    hotkeys('Space', (e) => {
      e.preventDefault()
      controls.playPause()
    })
    hotkeys('Right', (e) => {
      e.preventDefault()
      controls.skipForward()
    })
    hotkeys('Left', (e) => {
      e.preventDefault()
      controls.skipBackward()
    })
    hotkeys('K', (e) => {
      e.preventDefault()
      controls.playPause()
    })
    hotkeys('L', (e) => {
      e.preventDefault()
      controls.skipForward()
    })
    hotkeys('J', (e) => {
      e.preventDefault()
      controls.skipBackward()
    })
  }, [controls])

  useEffect(() => {
    bindKeys()

    return () => {
      hotkeys.unbind()
    }
  }, [controls, bindKeys])
}
