import { ReactElement } from 'react'

interface Props {
  id: string
  label?: string
  value: number
  min?: number
  max?: number
  onChange?: (event) => void
  step?: number
}

const Slider = ({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  onChange
}: Props): ReactElement => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        step={step}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300 text-gray-600"
      />
    </div>
  )
}

export default Slider
