import { useCallback, useEffect, useRef, useState } from 'react'

const useRegions = (wavesurfer): any => {
  const [regions, setRegions] = useState<any>([])
  const $regions = useRef<any>(regions)
  const $ws = useRef(wavesurfer)

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
    setRegions((prev) => [
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
