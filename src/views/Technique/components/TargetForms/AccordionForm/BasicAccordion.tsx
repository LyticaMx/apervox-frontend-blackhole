import { useState, useRef, ReactElement, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'
import clsx from 'clsx'

interface AccordionProps {
  title: string
  children: JSX.Element | JSX.Element[]
  startOpen?: boolean
  error?: boolean
}

const BasicAccordion = ({
  title,
  children,
  startOpen = false,
  error = true
}: AccordionProps): ReactElement => {
  const [isOpened, setOpened] = useState<boolean>(false)
  const contentElement = useRef<HTMLDivElement>(null)

  const toggleOpen = (): void => {
    setOpened(!isOpened)
  }

  useEffect(() => {
    if (startOpen) {
      toggleOpen()
    }
  }, [])

  return (
    <div>
      <div
        onClick={toggleOpen}
        className={
          'p-2  flex justify-between bg-white mt-1 rounded-md items-center rounded-b-none cursor-pointer'
        }
      >
        <Typography
          variant="subtitle"
          style="semibold"
          className={clsx('uppercase', error && 'text-red-500')}
        >
          {title}
          {error ? ' * ' : ''}
        </Typography>

        {isOpened ? (
          <ChevronUpIcon className="w-5 h-5 cursor-pointer text-primary-500 hover:text-primary-700" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 cursor-pointer text-primary-500 hover:text-primary-700" />
        )}
      </div>

      <div
        ref={contentElement}
        className={clsx(
          'bg-white overflow-hidden transition-all duration-200',
          !isOpened ? 'max-h-0' : 'max-h-fit'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default BasicAccordion
