import Slider from 'components/Slider'
import { ReactElement, useState } from 'react'

interface Props {
  filters: any[]
  onChangeFilters: (newFilters) => void
}

const Equalizer = ({ filters, onChangeFilters }: Props): ReactElement => {
  const [defaultFilters, setDefaultFilters] = useState(filters)

  const onChange = (frequency: string, newValue: number): void => {
    const newFilters = defaultFilters.map((filter) => {
      const modifiedFilter = filter
      if (filter.frequency.value === frequency) {
        modifiedFilter.gain.value = newValue
      }

      return modifiedFilter
    })

    setDefaultFilters(newFilters)
    onChangeFilters(newFilters)
  }

  return (
    <div>
      {defaultFilters.map((filter, index) => (
        <Slider
          key={`filter-${index}`}
          id="wavesurfer-volume"
          value={filter.gain.value}
          min={-40}
          max={40}
          onChange={(e) => onChange(filter.frequency.value, e.target.value)}
        />
      ))}
    </div>
  )
}

export default Equalizer
