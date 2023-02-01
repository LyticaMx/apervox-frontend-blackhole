import { ReactElement, useEffect } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import Dialog from 'components/Dialog'

import { useFormatMessage } from 'hooks/useIntl'

import { deleteMessages } from '../messages'
import Checkbox from 'components/Form/Checkbox'
import { useToggle } from 'hooks/useToggle'

interface Props {
  open?: boolean
  onClose?: (event?: any) => void
  onAccept?: () => void
}

const DeleteDependencyDialog = ({
  open = true,
  onClose = () => {},
  onAccept = () => {}
}: Props): ReactElement => {
  const getMessage = useFormatMessage(deleteMessages)
  const [accept, toggle, setAccept] = useToggle(false)

  useEffect(() => {
    if (open) {
      setAccept(false)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} size="md" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {getMessage('title')}
            </h3>
            <p className="text-sm text-gray-500 my-2">
              {getMessage('userLinkedAction')}
            </p>

            <Checkbox
              checked={accept}
              onChange={() => toggle()}
              label={getMessage('userAcceptAction')}
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          disabled={!accept}
          className="disabled:opacity-75 disabled:hover:bg-red-600 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onAccept}
        >
          {getMessage('accept')}
        </button>
        <button
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onClose}
        >
          {getMessage('cancel')}
        </button>
      </div>
    </Dialog>
  )
}

export default DeleteDependencyDialog
