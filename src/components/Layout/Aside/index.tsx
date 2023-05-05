import { ReactElement, ReactNode, useEffect, useMemo } from 'react'
import clsx from 'clsx'
import { XCircleIcon } from '@heroicons/react/24/outline'

import { useDrawer } from 'context/Drawer'

const DEFAULT_WIDTH = '320px'
export const Aside = (): ReactElement | null => {
  const {
    body,
    show,
    type,
    actions,
    closeButton,
    config,
    isDismissable,
    title
  } = useDrawer()

  const isShowing = useMemo(() => show && type === 'aside', [show, type])
  const width = useMemo(() => config?.width ?? DEFAULT_WIDTH, [config?.width])

  useEffect(() => {
    const onKeyPress = (e: any): void => {
      if (e.key === 'Escape' && isDismissable) {
        actions?.handleCloseDrawer()
      }
    }

    if (isShowing) {
      window.addEventListener('keyup', onKeyPress)
    }

    return () => {
      window.removeEventListener('keyup', onKeyPress)
    }
  }, [isShowing, actions?.handleCloseDrawer])

  useEffect(() => {
    return () => {
      actions?.handleCloseDrawer()
    }
  }, [])

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

  return (
    <aside
      style={{
        width: isShowing ? 'auto' : '0px'
      }}
      className={clsx(
        'z-50  overflow-y-auto bg-neutral-200 bg-opacity-60 transition-width duration-500 outline-none shadow-md shadow-gray-300 sticky top-0',
        config?.className
      )}
    >
      <div style={{ width }} className="p-4">
        <div className="h-full flex flex-col">
          <header className="flex items-center gap-1">
            {title && renderTitle()}
            {closeButton ?? (
              <button
                type="button"
                onClick={actions?.handleCloseDrawer}
                className="text-secondary-gray bg-transparent hover:text-primary rounded-lg text-sm inline-flex items-center ml-auto h-5"
              >
                <span className="sr-only">Close menu</span>
                <XCircleIcon className="h-5 w-5" />
              </button>
            )}
          </header>
          <div className="overflow-y-auto min-h-0 flex-1 basis-auto">
            {body}
          </div>
        </div>
      </div>
    </aside>
  )
}
