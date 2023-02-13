import { MinusIcon, StopIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ReactElement, useCallback } from 'react'
// Se comenta de manera temporal este import para permitir el desarrollo en la web
// const { ipcRenderer } = window.require('electron')

interface Props {
  className?: string
}

const WindowControl = (props: Props): ReactElement => {
  // Se agrega de manera temporal para permitir el uso de el componente sin necesidad de iniciar con electron
  const ipcRenderer = {
    send: (temp: string) => {
      alert(temp)
    }
  }

  const minimize = useCallback(
    (): void => ipcRenderer.send('minimize-window'),
    []
  )
  const maximize = useCallback(
    (): void => ipcRenderer.send('maximize-window'),
    []
  )
  const close = useCallback((): void => ipcRenderer.send('close-window'), [])

  return (
    <div className={props.className}>
      <div className="flex">
        <button
          className="hidden mx-2 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
          onClick={minimize}
        >
          <MinusIcon className="w-4 h-4 text-white" />
        </button>
        <button
          className="hidden mx-2 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
          onClick={maximize}
        >
          <StopIcon className="w-4 h-4 text-white" />
        </button>
        <button
          className="hidden mx-2 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
          onClick={close}
        >
          <XMarkIcon className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}

export default WindowControl
