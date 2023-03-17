import { ReactElement } from 'react'
import { SoundControl } from './SoundControl'

interface Props {
  className?: string
  index: number | string
  filter: any
  onChange: (...any) => void
}
const EqualizerControl = (props: Props): ReactElement => {
  const { onChange, index, filter, className } = props

  const handleChange = ({ value }): void => {
    onChange(index, value)
  }

  const getLabel = (filter): string =>
    filter.frequency.value >= 1000
      ? `${Math.floor(filter.frequency.value)}k`
      : filter.frequency.value

  return (
    <SoundControl
      className={className}
      min={-40}
      max={40}
      value={filter.gain.value}
      step={4}
      showPercent={false}
      label={getLabel(filter)}
      onChange={handleChange}
    />
  )
}

export default EqualizerControl
