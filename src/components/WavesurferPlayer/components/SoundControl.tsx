import clsx from 'clsx'
import { isValidElement, ReactElement } from 'react'

interface Props {
  name?: string
  value: number
  min: number
  max: number
  step: number
  label: string
  showPercent: boolean
  className?: string
  onChange: (...any) => any
}
const SoundControl = (props: Props): ReactElement | null => {
  const {
    name,
    value,
    min,
    max,
    step,
    onChange,
    label,
    showPercent,
    className
  } = props
  const stepsToRender = Math.floor((max - min) / step)

  const renderSteps = (): ReactElement => {
    const steps: any = []
    let renderValue = max
    const generateOnChange = (name, value) => () => onChange({ name, value })

    while (renderValue >= min) {
      steps.push(
        <button
          key={renderValue}
          onClick={generateOnChange(name, renderValue)}
          className={renderValue <= value ? 'active' : ''}
        ></button>
      )
      renderValue -= step
    }

    return steps
  }

  if (min > max) return null
  if (stepsToRender > 100) {
    return null
  }

  if (value < min || value > max) {
    return null
  }

  const percent = Math.floor((100 * (value - min)) / (max - min))

  return (
    <div className={clsx('relative w-40', className)}>
      <div className="absolute top-[35%] left-[-3rem]">
        {showPercent && <label>{`${percent}%`}</label>}
      </div>
      <div className="flex items-around justify-center flex-col w-6">
        {renderSteps()}
        {isValidElement(label) ? (
          label
        ) : (
          <div className="mt-1 text-sm text-center">
            <label>{label}</label>
          </div>
        )}
      </div>
    </div>
  )
}

export { SoundControl }
