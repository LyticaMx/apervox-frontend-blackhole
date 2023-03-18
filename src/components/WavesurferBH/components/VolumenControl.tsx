import { SpeakerWaveIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

interface Props {
  value: number
  min?: number
  max?: number
  onChange?: (event) => void
  step?: number
}
const VolumenControl = (props: Props): ReactElement => {
  return (
    <div className="flex gap-4 items-center">
      <SpeakerWaveIcon className="w-5 h-5 text-muted" />
      <input
        type="range"
        {...props}
        step={props.step ?? 1}
        className="ws-range rounded-lg flex-1 bg-white h-1 accent-primary"
      />
    </div>
  )
}

export default VolumenControl
