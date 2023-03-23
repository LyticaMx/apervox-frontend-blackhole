import { ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { ReactElement } from 'react'
import useWavesurferContext from '../hooks/useWavesurferContext'

export const SpeedControl = (): ReactElement => {
  const { controls } = useWavesurferContext()

  const classes = {
    base: 'text-sm text-center leading-none px-2 py-1 w-10 rounded-lg  border',
    active: 'text-primary bg-white border-primary',
    inactive: 'border-transparent text-white'
  }

  const speedMarks = [
    { value: 1, label: '1x' },
    { value: 1.5, label: '1.5x' },
    { value: 2, label: '2x' }
  ]
  return (
    <div className="flex-1 flex gap-2 items-center">
      <ArrowPathIcon className="h-5 w-5 text-muted cursor-pointer mr-3" />
      {speedMarks.map((item) => (
        <button
          className={clsx(classes.base, {
            [classes.active]: item.value === controls?.speed,
            [classes.inactive]: item.value !== controls?.speed
          })}
          key={item.label}
          onClick={() => controls?.setSpeed(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
