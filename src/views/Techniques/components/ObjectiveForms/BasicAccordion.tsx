import { useState, useRef, ReactElement, useCallback, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'

interface AccordionProps {
  title: string
  children: JSX.Element | JSX.Element[]
  // dependencies?: any[]
}

const BasicAccordion = ({
  title,
  children
}: // dependencies
AccordionProps): ReactElement => {
  const [isOpened, setOpened] = useState<boolean>(false)
  const [height, setHeight] = useState<string>('0px')
  const contentElement = useRef<HTMLDivElement>(null)

  const toggleOpen = (): void => {
    setOpened(!isOpened)
    setHeight(!isOpened ? `${contentElement.current?.scrollHeight}px` : '0px')
  }

  // useEffect(() => {
  //   onResize()
  // }, [dependencies])

  const onResize = useCallback(() => {
    console.log('onResize')

    if (contentElement.current) {
      setHeight(`${contentElement.current?.scrollHeight}px`)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    // onResize()

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
        <Typography variant="subtitle" style="semibold" className="uppercase">
          {title}
        </Typography>

        {isOpened ? (
          <ChevronUpIcon className="w-5 h-5 cursor-pointer text-primary-500 hover:text-primary-700" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 cursor-pointer text-primary-500 hover:text-primary-700" />
        )}
      </div>

      <div
        ref={contentElement}
        style={{ height: height }}
        className="bg-white overflow-hidden transition-all duration-200"
      >
        {children}
      </div>
    </div>
  )
}

export default BasicAccordion
