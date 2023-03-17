import { useEffect, useCallback } from 'react'
import hotkeys from 'hotkeys-js'

export const useHotkeys = (wavesurfer: any, getSkip: () => void): void => {
  const bindKeys = useCallback(() => {
    hotkeys('Space', (e) => {
      e.preventDefault()
      wavesurfer.playPause()
    })
    hotkeys('Right', (e) => {
      e.preventDefault()
      wavesurfer.skipForward(getSkip())
    })
    hotkeys('Left', (e) => {
      e.preventDefault()
      wavesurfer.skipBackward(getSkip())
    })
    hotkeys('K', (e) => {
      e.preventDefault()
      wavesurfer.playPause()
    })
    hotkeys('L', (e) => {
      e.preventDefault()
      wavesurfer.skipForward(getSkip())
    })
    hotkeys('J', (e) => {
      e.preventDefault()
      wavesurfer.skipBackward(getSkip())
    })
  }, [wavesurfer, getSkip])

  useEffect(() => {
    if (!wavesurfer) return
    bindKeys()

    return () => {
      hotkeys.unbind()
    }
  }, [wavesurfer, bindKeys])
}
