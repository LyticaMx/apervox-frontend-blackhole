import { useCallback, useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js/src/wavesurfer'

const useRegions = (
  wavesurfer: WaveSurfer | null,
  regionsDefault: any
): any => {
  const [regions, setRegions] = useState<any>([])
  const $regions = useRef<any[]>(regions)
  const $ws = useRef<WaveSurfer | null>(wavesurfer)

  useEffect(() => {
    if (wavesurfer) {
      $ws.current = wavesurfer
      $ws.current.on('region-created', regionCreatedHandler)
      $ws.current.on('region-updated', regionUpdatedHandler)
    }
  }, [wavesurfer])

  useEffect(() => {
    $regions.current = regions
  }, [regions])

  const regionCreatedHandler = useCallback((region) => {
    setRegions((prev: any[]) => [
      ...prev,
      {
        ...region,
        data: {
          saved: false,
          nombre: ''
        }
      }
    ])
  }, [])

  useEffect(() => {
    if (!wavesurfer) return
    if (regionsDefault) {
      setRegions(
        regionsDefault.map((region) => $ws.current?.regions?.add(region))
      )
    }

    return () => {
      $ws.current?.regions.clear()
    }
  }, [wavesurfer, regionsDefault])

  const regionUpdatedHandler = useCallback((region) => {
    setRegions((prev) =>
      prev.map((item) => {
        if (item.id === region.id) return region

        return item
      })
    )
  }, [])

  return regions
}

export default useRegions
