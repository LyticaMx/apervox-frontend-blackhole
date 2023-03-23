import { useEffect, useRef } from 'react'
import {
  MarkerParams,
  Marker as IBaseMarker
} from 'wavesurfer.js/src/plugin/markers'
import { EventHandler } from 'wavesurfer.js/types/util'
import useWavesurferContext from '../hooks/useWavesurferContext'

export interface IMarker extends IBaseMarker {
  el?: HTMLDivElement
}

export interface MarkerProps extends MarkerParams {
  draggable?: boolean
  onClick?: EventHandler
  onDrop?: EventHandler
  onDrag?: EventHandler
}

// TODO: remove boilerplate in useEffects section, try to update useRegionEvent to support
//  all kinds of event handling within WaveSurfer ecosystem
const Marker = ({ onClick, onDrop, onDrag, ...data }: MarkerProps): void => {
  const ws = useWavesurferContext()

  // TODO: make some kind of useGetLatestWs...
  const ws$ = useRef(ws)
  useEffect(() => {
    ws$.current = ws
  }, [ws])

  // This is the only legal/official way to identify marker
  // inside wavesurfer markers list and
  // to tie it with Marker component
  const isRendered = useRef<boolean>(false)
  const markerEl = useRef<IMarker | null>(null)

  useEffect(() => {
    if (!ws) return

    if (!onClick) return

    const handler = (marker: IMarker, event: Event): void => {
      if (!markerEl.current) return

      if (marker.el !== markerEl.current.el) return

      onClick?.(marker, event)
    }

    ws.wavesurfer?.on('marker-click', handler)

    return () => {
      ws.wavesurfer?.un('marker-click', handler)
    }
  }, [ws, onClick])

  useEffect(() => {
    if (!ws) return

    if (!onDrag) return

    const handler = (marker: IMarker, event: Event): void => {
      if (!markerEl.current) return

      if (marker.el !== markerEl.current.el) return

      onDrag?.(marker, event)
    }

    ws.wavesurfer?.on('marker-drag', handler)

    return () => {
      ws.wavesurfer?.un('marker-drag', handler)
    }
  }, [ws, onDrag])

  useEffect(() => {
    if (!ws) return

    if (!onDrop) return

    const handler = (marker: IMarker, event: Event): void => {
      if (!markerEl.current) return

      if (marker.el !== markerEl.current.el) return

      onDrop?.(marker, event)
    }

    ws.wavesurfer?.on('marker-drop', handler)

    return () => {
      ws.wavesurfer?.un('marker-drop', handler)
    }
  }, [ws, onDrop])

  useEffect(() => {
    if (!ws) return
    // THERE CAN BE ONLY ONE
    // ...
    // ...
    // ...
    // marker creation for each Marker component.
    // If there is a better way, PRs welcome!
    if (isRendered.current) return

    isRendered.current = true

    // create marker: marker becomes visible at the same time
    markerEl.current = ws.wavesurfer?.addMarker(data)
  }, [ws])

  useEffect(() => {
    if (!ws || !markerEl.current || !isRendered.current) return

    // Проверяем что изменения реально имели место быть,
    // но снаружи, а не внутри
    // На данный момент, меняется только позиция
    if (data.time === markerEl.current?.time) return

    // When wavesurfer will officially make markers fully updatable,
    // then it will be done in other way, for now it's enough.
    //
    // For enthusiasts, it is possible to deep dive into the process of marker creation and make a PR,
    // that will add full marker update support.
    // https://wavesurfer-js.org/api/file/src/plugin/markers/index.js.html

    const marker = ws.wavesurfer?.markers.markers.find(
      (mark) => mark.position === markerEl.current?.position
    )

    if (!marker) return

    marker.time = data.time

    ;(ws.wavesurfer?.markers as any)._updateMarkerPosition({
      ...markerEl.current,
      time: data.time
    })
  }, [data?.time])

  // Maybe it will require to create some single source of truth for Markers,
  // as far as they are working via wavesurfer instance. That's making'em
  // different from Regions in the way of working.
  useEffect(
    () => () => {
      if (!ws$.current || !markerEl.current) return

      const index = ws$.current.wavesurfer?.markers.markers.findIndex(
        (marker: IMarker) => {
          return marker.el === markerEl.current?.el
        }
      )

      ws$.current.wavesurfer?.markers.remove(index ?? 0)
    },
    []
  )
}

export default Marker
