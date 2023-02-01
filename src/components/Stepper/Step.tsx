import clsx from 'clsx'
import { MouseEvent, ReactElement, ReactNode } from 'react'

export type Placement = 'top' | 'right' | 'left' | 'bottom'

interface Props {
  value: number
  active?: boolean
  completed?: boolean
  placement?: Placement
  children: ReactNode
  onClick?: (e: MouseEvent) => void
}
const Step = ({
  children,
  value,
  active,
  completed,
  placement = 'right',
  onClick
}: Props): ReactElement => {
  const classPlacement = {
    top: 'flex-col-reverse justify-center items-center gap-1',
    bottom: 'flex-col justify-center items-center gap-1',
    left: 'flex-row-reverse justify-center items-center gap-2',
    right: 'justify-center items-center gap-2'
  }
  return (
    <li
      className={clsx(
        'flex items-center bg-white p-2 sm:min-w-[100px]',
        {
          'cursor-pointer': onClick
        },
        classPlacement[placement]
      )}
      onClick={onClick}
    >
      <span
        className={clsx(
          'h-6 w-6 rounded-full  text-center text-[10px] font-bold leading-6 flex justify-center items-center',
          {
            'bg-gray-100': !active && !completed
          },
          active && 'bg-blue-500 text-white',
          completed && 'bg-blue-500 text-white'
        )}
      >
        {completed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {!completed && value}
      </span>

      <span className="hidden sm:block"> {children} </span>
    </li>
  )
}

export default Step
