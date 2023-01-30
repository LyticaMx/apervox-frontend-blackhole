import clsx from 'clsx'
import { ReactElement } from 'react'

interface Props {
  title?: string
  margin?: 'normal' | 'none'
  style?: 'light' | 'medium' | 'normal'
}

const Divider = ({
  title,
  margin = 'normal',
  style = 'normal'
}: Props): ReactElement => {
  const borders = {
    light: 'border-gray-200',
    medium: 'border-gray-300',
    normal: 'border-gray-400'
  }
  const textcolor = {
    light: 'text-gray-200',
    medium: 'text-gray-300',
    normal: 'text-gray-400'
  }

  return (
    <div
      className={clsx(
        'relative flex items-center',
        margin === 'normal' && 'py-5'
      )}
    >
      <div className={clsx('flex-grow border-t', borders[style])}></div>
      {title && (
        <>
          <span className={clsx('flex-shrink mx-4', textcolor[style])}>
            {title}
          </span>
          <div className={clsx('flex-grow border-t ', borders[style])}></div>
        </>
      )}
    </div>
  )
}

export default Divider
