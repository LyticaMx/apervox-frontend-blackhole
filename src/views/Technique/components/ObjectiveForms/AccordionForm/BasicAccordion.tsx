import { useState, useRef, ReactElement, useCallback, useEffect } from 'react'
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
  const [height, setHeight] = useState<string>('0px')
  const contentElement = useRef<HTMLDivElement>(null)

  const toggleOpen = (): void => {
    setOpened(!isOpened)
    setHeight(!isOpened ? `${contentElement.current?.scrollHeight}px` : '0px')
  }

  const onResize = useCallback(() => {
    if (contentElement.current) {
      setHeight(`${contentElement.current?.scrollHeight}px`)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize)

    if (startOpen) {
      toggleOpen()
    }

    return () => {
      window.removeEventListener('resize', onResize)
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
        style={{ height }}
        className="bg-white overflow-hidden transition-all duration-200"
      >
        {children}
      </div>
    </div>
  )
}

export default BasicAccordion
