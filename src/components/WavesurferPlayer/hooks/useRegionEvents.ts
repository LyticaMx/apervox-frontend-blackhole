/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useCallback, useEffect, useRef, useState } from 'react'

import { randomColor } from '../helpers'
import RegionHandler from '../regions/RegionHandler'
import { useDebounce } from 'usehooks-ts'

export const useRegionEvents = ({ wavesurfer, onChangeRegions }) => {
  const [showRegionMenu, setShowRegionMenu] = useState(false)
  const [regionSelected, setRegionSelected] = useState<any>(null)
  const [regionMenuCoords, setRegionMenuCoords] = useState([0, 0])
  const [regionsLoaded, setRegionsLoaded] = useState(false)
  const [regionCreated, setRegionCreated] = useState<any>(null)
  const [regionUpdated, setRegionUpdated] = useState<any>(null)
  const [regionHandler, setRegionHandler] = useState<any>(null)
  const annotationRef = useRef<any>(null)

  useEffect(() => {
    if (!wavesurfer) return
    setRegionHandler(new RegionHandler(wavesurfer))
  }, [wavesurfer])

  const handleRegionError = useCallback(
    (region) => {
      if (regionCreated) {
        regionHandler.deleteRegion(region.id)
      } else if (regionUpdated) {
        const previousRegion = regionUpdated
        const differenceStart = -1 * (region.start - previousRegion.start)
        const differenceEnd = -1 * (region.end - previousRegion.end)

        if (differenceStart < 0) {
          region.onResize(differenceStart, 'start')
          region.onResize(differenceEnd, 'end')
        } else {
          region.onResize(differenceEnd, 'end')
          region.onResize(differenceStart, 'start')
        }
      } else {
        regionHandler.deleteRegion(region.id)
      }
    },
    [regionHandler, regionCreated, regionUpdated]
  )

  const fixOverlatedRegions = useCallback(
    (region) => {
      const overlatedRegions = regionHandler.getOverlatedRegions(region)
      let difference

      if (
        regionHandler.regionIsInNoneSpace(region) ||
        overlatedRegions.length > 2
      ) {
        handleRegionError(region)
      } else {
        for (const ovRegion of overlatedRegions) {
          if (ovRegion.overlaps === 1) {
            difference = ovRegion.region.end - region.start
            region.onResize(difference, 'start')
          } else if (ovRegion.overlaps === -1) {
            difference = region.end - ovRegion.region.start
            region.onResize(-difference)
          } else if (ovRegion.overlaps === 2) {
            handleRegionError(region)
          }
        }
      }
    },
    [regionHandler, handleRegionError]
  )

  const getRegionData = useCallback(() => {
    const regions = wavesurfer.regions.list
    const regionData: any = []

    for (const id in regions) {
      const annotation = regions[id].data.annotation

      regionData.push({
        id: regions[id].data.annotation.region.id,
        text: annotation.text,
        interval: annotation.interval
      })
    }

    return regionData
  }, [wavesurfer])

  const handleRegionClick = useCallback(
    (region, event) => {
      event.stopPropagation()
      if (event.shiftKey) region.playLoop()
      if (regionSelected && region.id !== regionSelected.id) {
        setShowRegionMenu(false)
        setRegionSelected(null)
      }
    },
    [regionSelected]
  )

  const handleRegionContextMenu = useCallback((region, event) => {
    event.preventDefault()
    event.stopPropagation()
    const { clientX, clientY } = event

    setShowRegionMenu(true)
    setRegionMenuCoords([clientX - 280, clientY - 130])
    setRegionSelected(region)
  }, [])

  const handleRegionIn = useCallback(
    (region) => {
      if (!showRegionMenu) setRegionSelected(region)
    },
    [showRegionMenu]
  )

  const handleRegionOut = useCallback(() => {
    if (!showRegionMenu) setRegionSelected(null)
  }, [showRegionMenu])

  const handleRegionMouseEnter = useCallback(
    (region, { clientX, clientY }) => {
      if (
        annotationRef?.current &&
        region.data.annotation.text &&
        annotationRef.current.textContent !== region.data.annotation.text
      ) {
        const annotation = annotationRef.current

        annotation.textContent = region.data.annotation.text
          ? region.data.annotation.text
          : ''
        annotation.style.display = 'block'
        annotation.style.position = 'fixed'
        annotation.style.top = `${clientY - 150}px`
        annotation.style.left = `${clientX - -10}px`
        annotation.style['z-index'] = 1000
        annotation.style.background = 'rgba(0,0,0,0.5)'
        annotation.style.padding = '10px'
        annotation.style.color = 'white'
      }

      if (!showRegionMenu) setRegionSelected(region)
    },
    [showRegionMenu]
  )

  const handleRegionMouseLeave = useCallback(() => {
    if (annotationRef?.current) {
      annotationRef.current.textContent = ''
      annotationRef.current.style.display = 'none'
    }
  }, [])

  const handleRegionCreated = useCallback(
    (region) => {
      RegionHandler.addAnnotation(region)
      if (regionsLoaded) {
        // eslint-disable-next-line no-param-reassign
        region.color = randomColor(0.7)
        setRegionCreated({ ...region })
      }
    },
    [regionsLoaded]
  )

  const handleRegionUpdated = useDebounce(
    useCallback(
      (region) => {
        if (!regionUpdated) setRegionUpdated(region)
      },
      [regionUpdated]
    ),
    500
  )

  const handleRegionUpdateEnd = useCallback(
    (region) => {
      fixOverlatedRegions(region)
      region.data.annotation.updateInterval()
      if (onChangeRegions) onChangeRegions(getRegionData())
      if (regionCreated) setRegionCreated(null)
      else if (regionUpdated) setRegionUpdated(null)
    },
    [
      onChangeRegions,
      fixOverlatedRegions,
      getRegionData,
      regionCreated,
      regionUpdated
    ]
  )

  const toggleShowRegionMenu = useCallback(() => {
    if (showRegionMenu && onChangeRegions) onChangeRegions(getRegionData())
    setShowRegionMenu(!showRegionMenu)
  }, [onChangeRegions, showRegionMenu, getRegionData])

  const playRegionLoop = (region): void => {
    region.playLoop()
  }

  const handleLoadRegions = useCallback(
    (regions) => {
      console.log('🚀 ~ regions', regions)
      if (!wavesurfer) return
      setRegionsLoaded(true)

      for (const id of Object.keys(wavesurfer.regions.list)) {
        regionHandler.deleteRegion(id)
      }

      for (const region of regions) {
        wavesurfer.addRegion(RegionHandler.configureRegion(region))
      }
    },
    [wavesurfer]
  )

  useEffect(() => {
    if (!wavesurfer) return
    if (!regionHandler) return
    wavesurfer.on('region-click', handleRegionClick)
    wavesurfer.on('region-contextmenu', handleRegionContextMenu)
    wavesurfer.on('region-in', handleRegionIn)
    wavesurfer.on('region-out', handleRegionOut)
    wavesurfer.on('region-mouseenter', handleRegionMouseEnter)
    wavesurfer.on('region-mouseleave', handleRegionMouseLeave)
    wavesurfer.on('region-created', handleRegionCreated)
    wavesurfer.on('region-updated', handleRegionUpdated)
    wavesurfer.on('region-update-end', handleRegionUpdateEnd)

    return () => {
      if (!wavesurfer) return
      if (!regionHandler) return
      wavesurfer.un('region-click', handleRegionClick)
      wavesurfer.un('region-contextmenu', handleRegionContextMenu)
      wavesurfer.un('region-in', handleRegionIn)
      wavesurfer.un('region-out', handleRegionOut)
      wavesurfer.un('region-mouseenter', handleRegionMouseEnter)
      wavesurfer.un('region-mouseleave', handleRegionMouseLeave)
      wavesurfer.un('region-created', handleRegionCreated)
      wavesurfer.un('region-updated', handleRegionUpdated)
      wavesurfer.un('region-update-end', handleRegionUpdateEnd)
    }
  }, [
    wavesurfer,
    regionHandler,
    handleRegionClick,
    handleRegionContextMenu,
    handleRegionIn,
    handleRegionOut,
    handleRegionMouseEnter,
    handleRegionMouseLeave,
    handleRegionCreated,
    handleRegionUpdated,
    handleRegionUpdateEnd
  ])

  return {
    annotationRef,
    regionHandler,
    regionSelected,
    showRegionMenu,
    toggleShowRegionMenu,
    regionMenuCoords,
    handleLoadRegions,
    playRegionLoop
  }
}
