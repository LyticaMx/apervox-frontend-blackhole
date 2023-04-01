import React, { ReactElement, useCallback, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import useRegionEvent from '../hooks/useRegionEvent'
import useWavesurferContext from '../hooks/useWavesurferContext'
import { RegionParams } from 'wavesurfer.js/src/plugin/regions'
import { RegionContentProps, WsRegionProps } from '../types'

const asRegion = (
  WrappedComponent: React.ComponentType<RegionContentProps>
): ((props: WsRegionProps) => ReactElement | null) => {
  const displayName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'

  const ComponentAsRegion = ({
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
  }: WsRegionProps): ReactElement => {
    const { wavesurfer } = useWavesurferContext()

    const regionRef = useMemo(() => {
      if (wavesurfer) {
        return wavesurfer.regions.list[props.id]
      }
      return null
    }, [wavesurfer])

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

      if (!$region || !regionRef) return null

      let element = $region.querySelector('.region-container')

      if (!element) {
        element = document.createElement('div')
        element.classList.add('region-container', 'w-full', 'h-full')
        $region.prepend(element)
      }

      return ReactDOM.createPortal(
        <WrappedComponent region={regionRef} />,
        element
      )
    }, [regionRef])

    return <Portal />
  }

  ComponentAsRegion.displayName = `asRegion(${displayName})`

  return ComponentAsRegion
}

export default asRegion

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
