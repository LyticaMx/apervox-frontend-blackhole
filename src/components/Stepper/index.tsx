import clsx from 'clsx'
import { ReactElement } from 'react'
import Step, { Placement } from './Step'

export interface Props {
  active?: number
  steps?: string[]
  placement?: Placement
  variant?: 'linear' | 'nonLinear'
  orientation?: 'horizontal' | 'vertical'
  onClick?: (step: number) => void
}

const Stepper = ({
  active = 0,
  steps = [],
  placement,
  orientation = 'horizontal',
  variant = 'linear',
  onClick
}: Props): ReactElement => {
  const containerClass = {
    horizontal: '',
    vertical: ''
  }
  const afterClass = {
    horizontal:
      'after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-200',
    vertical:
      'after:absolute after:inset-y-0 after:left-6 after:block after:w-0.5 after:-translate-x-1/2 after:rounded-lg after:bg-gray-200'
  }
  const orientationClass = {
    horizontal: 'flex-row justify-between',
    vertical: 'flex-col gap-5 items-start'
  }
  const handleClick = (step: number): (() => void) | undefined =>
    variant === 'nonLinear'
      ? () => {
          if (onClick) onClick(step)
        }
      : undefined

  return (
    <div
      className={clsx(
        'relative',
        containerClass[orientation],
        afterClass[orientation]
      )}
    >
      <ol
        className={clsx(
          'relative z-10 flex text-sm font-medium text-gray-500',
          orientationClass[orientation]
        )}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            value={index + 1}
            active={active === index}
            completed={active > index}
            placement={placement}
            onClick={handleClick(index)}
          >
            {step}
          </Step>
        ))}
      </ol>
    </div>
  )
}

export default Stepper
