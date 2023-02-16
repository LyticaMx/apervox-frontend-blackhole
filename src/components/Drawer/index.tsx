import clsx from 'clsx'
import { ReactElement, ReactNode, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { zIndex } from 'constants/classes'

type Placement = 'left' | 'right' | 'bottom' | 'top'
type Placements = Record<Placement, string>
interface Props {
  open?: boolean
  children?: ReactNode
  placement?: Placement
  title?: ReactNode
  className?: string
  onClose?: () => void
}

const createPortalRoot = (): HTMLDivElement => {
  return document.createElement('div')
}

const placements: Placements = {
  left: 'inset-y-0 left-0',
  right: 'inset-y-0 right-0',
  top: 'inset-x-0 top-0',
  bottom: 'inset-x-0 bottom-0'
}

const Drawer = ({
  open,
  children,
  title,
  placement = 'left',
  className,
  onClose = () => {}
}: Props): ReactElement => {
  const bodyRef = useRef(document.querySelector('body'))
  const portalRootRef = useRef(createPortalRoot())

  useEffect(() => {
    bodyRef.current?.appendChild(portalRootRef.current)
    const portal = portalRootRef.current

    return () => {
      portal.remove()
    }
  }, [])

  useEffect(() => {
    const onKeyPress = (e: any): void => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (open) {
      window.addEventListener('keyup', onKeyPress)
    }

    return () => {
      window.removeEventListener('keyup', onKeyPress)
    }
  }, [open, onClose])

  const classOpen = useMemo(
    () =>
      open ? 'opacity-100 duration-500' : 'opacity-0 duration-500 invisible',
    [open]
  )

  const renderTitle = (): ReactNode => {
    let rTitle: ReactNode = ''

    if (typeof title === 'string') {
      rTitle = (
        <h5
          id="drawer-bottom-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 "
        >
          {title}
        </h5>
      )
    } else {
      rTitle = title
    }

    return rTitle
  }
  return createPortal(
    [
      <div
        key="drawer-backdrop"
        className={clsx(
          'fixed overflow-hidden bg-gray-900 bg-opacity-25 inset-0 transition-all duration-500',
          {
            'bg-opacity-25': open,
            'invisible bg-opacity-0': !open
          }
        )}
        onClick={onClose}
        style={{
          zIndex: zIndex.drawer
        }}
      />,
      <div
        key="drawer"
        className={clsx(
          className,
          'fixed z-50 p-4 overflow-y-auto bg-white transition-all',
          placements[placement],
          classOpen
        )}
        tabIndex={-1}
        aria-labelledby="drawer-bottom-label"
      >
        <div className="h-full flex flex-col">
          <header className="flex">
            {title && renderTitle()}
            <button
              type="button"
              onClick={() => {
                onClose()
              }}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center ml-auto"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </header>
          <div className="overflow-y-auto min-h-0 flex-1 basis-auto">
            {children}
          </div>
        </div>
      </div>
    ],
    portalRootRef.current
  )
}

export default Drawer
