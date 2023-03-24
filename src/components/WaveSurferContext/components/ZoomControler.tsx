import { ReactElement, useRef } from 'react'
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import useWavesurferContext from '../hooks/useWavesurferContext'
import useProgress from 'hooks/useProgress'

interface Props {
  min?: number
  max?: number
  step?: number
}

const ZoomController = (props: Props): ReactElement => {
  const { controls } = useWavesurferContext()
  const zoomRef = useRef<HTMLInputElement>(null)

  useProgress(zoomRef, [controls?.zoom])

  return (
    <div className="flex gap-4 items-center">
      <MagnifyingGlassMinusIcon className="w-5 h-5 text-muted" />
      <input
        type="range"
        {...props}
        value={controls?.zoom}
        onChange={(e) => {
          controls?.setZoom(+e.target.value)
        }}
        step={props.step ?? 1}
        className="ws-range rounded-lg flex-1 bg-white h-1 player-slider slider-progress"
        ref={zoomRef}
      />
      <MagnifyingGlassPlusIcon className="w-5 h-5 text-muted" />
    </div>
  )
}

export default ZoomController
