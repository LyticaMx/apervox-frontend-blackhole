import clsx from 'clsx'
import { ReactElement } from 'react'

interface Props {
  value: number
  onClick: (value: number) => void
}
export const SpeedControl = ({ value, onClick }: Props): ReactElement => {
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
    <div className="flex-1 flex gap-2 items-start">
      {speedMarks.map((item) => (
        <button
          className={clsx(classes.base, {
            [classes.active]: item.value === value,
            [classes.inactive]: item.value !== value
          })}
          key={item.label}
          onClick={() => onClick(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
