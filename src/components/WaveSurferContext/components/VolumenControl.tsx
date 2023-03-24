import { SpeakerWaveIcon } from '@heroicons/react/24/outline'
import useProgress from 'hooks/useProgress'
import { ReactElement, useRef } from 'react'
import useWavesurferContext from '../hooks/useWavesurferContext'

interface Props {
  min?: number
  max?: number
  step?: number
}
const VolumenControl = (props: Props): ReactElement => {
  const { controls } = useWavesurferContext()
  const volumeRef = useRef<HTMLInputElement>(null)

  useProgress(volumeRef, [controls?.volume])

  return (
    <div className="flex gap-4 items-center">
      <SpeakerWaveIcon className="w-5 h-5 text-muted" />
      <input
        type="range"
        {...props}
        value={controls?.volume}
        onChange={(e) => {
          controls?.setVolume(+e.target.value)
        }}
        step={props.step ?? 1}
        className="ws-range rounded-lg flex-1 bg-white h-1 player-slider slider-progress"
        ref={volumeRef}
      />
    </div>
  )
}

export default VolumenControl
