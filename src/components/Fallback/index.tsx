import clsx from 'clsx'
import { ReactElement } from 'react'

interface Props {
  withBg?: boolean
}

const Fallback = (props: Props): ReactElement => {
  const { withBg } = props
  return (
    <div
      className={clsx(
        'h-full w-full flex items-center justify-center',
        withBg &&
          'bg-blackhole bg-no-repeat bg-center bg-cover relative before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#131B28] before:bg-opacity-[85%]'
      )}
    />
  )
}

export default Fallback
