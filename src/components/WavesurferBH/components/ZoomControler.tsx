import { ReactElement } from 'react'
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'

interface Props {
  value: number
  min?: number
  max?: number
  step?: number
  onZoomIn: () => void
  onZoomOut: () => void
  onChange: (event: any) => void
}

const ZoomController = ({
  onZoomIn,
  onZoomOut,
  ...props
}: Props): ReactElement => {
  return (
    <div className="flex gap-4 items-center">
      <MagnifyingGlassMinusIcon className="w-5 h-5 text-muted" />
      <input
        type="range"
        {...props}
        step={props.step ?? 1}
        className="ws-range rounded-lg flex-1 bg-white h-1 accent-primary"
      />
      <MagnifyingGlassPlusIcon className="w-5 h-5 text-muted" />
    </div>
  )
}

export default ZoomController
