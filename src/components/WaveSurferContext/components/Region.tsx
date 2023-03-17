/* eslint-disable @typescript-eslint/no-unused-vars */
import { Popover } from '@headlessui/react'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useElementSize } from 'usehooks-ts'
import {
  Region as RegionWS,
  RegionParams
} from 'wavesurfer.js/src/plugin/regions'
import { EventHandler } from 'wavesurfer.js/types/util'
import useRegionEvent from '../hooks/useRegionEvent'
import useWavesurferContext from '../hooks/useWavesurferContext'
import RegionContent from './RegionContent'

export interface RegionProps extends RegionParams {
  onClick?: EventHandler
  onOver?: EventHandler
  onLeave?: EventHandler
  onDoubleClick?: EventHandler
  onIn?: EventHandler
  onOut?: EventHandler
  onRemove?: EventHandler
  onUpdate?: EventHandler
  onUpdateEnd?: EventHandler
  id: string
}
export const Region = ({
  onOver,
  onLeave,
  onClick,
  onDoubleClick,
  onIn,
  onOut,
  onRemove,
  onUpdate,
  onUpdateEnd,
  ...props
}: RegionProps): ReactElement => {
  const waveSurfer = useWavesurferContext()

  const isRenderedCache = useRef(false)

  const [regionRef, setRegionRef] = useState<RegionWS | null>(null)

  useEffect(() => {
    return () => {
      if (regionRef) {
        regionRef.remove()
      }
    }
  }, [regionRef])

  // TODO: may need some improvements
  useEffect(
    () => {
      if (regionRef) {
        const update = UpdatableRegionProps.reduce<RegionParams>(
          (result, prop) => {
            if (regionRef[prop] !== props[prop]) {
              return {
                ...result,
                [prop]: props[prop]
              }
            }

            return result
          },
          { id: props.id }
        )

        regionRef.update(update)
      }
    },
    UpdatableRegionProps.map((prop) => props[prop as keyof RegionParams])
  )

  useEffect(() => {
    if (!isRenderedCache.current && waveSurfer) {
      isRenderedCache.current = true

      let region

      region = waveSurfer.regions.list[props.id]

      if (!region) {
        region = waveSurfer.addRegion(props)
      }

      setRegionRef(region)
    }
    // eslint-disable-next-line
  }, [waveSurfer])

  useRegionEvent(regionRef, 'click', onClick)

  useRegionEvent(regionRef, 'mouseenter', onOver)

  useRegionEvent(regionRef, 'mouseleave', onLeave)

  useRegionEvent(regionRef, 'dblclick', onDoubleClick)

  useRegionEvent(regionRef, 'in', onIn)

  useRegionEvent(regionRef, 'out', onOut)

  useRegionEvent(regionRef, 'remove', onRemove)

  useRegionEvent(regionRef, 'update', onUpdate)

  useRegionEvent(regionRef, 'update-end', onUpdateEnd)

  const Portal = useCallback(() => {
    const $region = document.querySelector(`[data-id="${regionRef?.id}"]`)

    if (!$region) return null

    let element = $region.querySelector('.region-container')

    if (!element) {
      element = document.createElement('div')
      element.classList.add('region-container', 'w-full', 'h-full')
      $region.prepend(element)
    }

    return ReactDOM.createPortal(<RegionContent region={regionRef} />, element)
  }, [regionRef])

  return <Portal />
}

export default Region

const UpdatableRegionProps: [
  'start',
  'end',
  'loop',
  'color',
  'handleStyle',
  'resize',
  'drag',
  'drag',
  'end',
  'handleStyle',
  'id',
  'loop',
  'preventContextMenu',
  'resize',
  'start'
] = [
  'start',
  'end',
  'loop',
  'color',
  'handleStyle',
  'resize',
  'drag',
  'drag',
  'end',
  'handleStyle',
  'id',
  'loop',
  'preventContextMenu',
  'resize',
  'start'
]
