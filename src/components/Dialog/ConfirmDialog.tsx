import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import Button from 'components/Button'
import { actionsMessages } from 'globalMessages'
import Dialog from '.'

interface Props {
  open: boolean
  title?: string
  subtitle?: string
  message: string
  className?: string
  onAccept: () => void
  onCancel: () => void
  onClose?: () => void
}

const ConfirmDialog = ({
  open,
  title,
  subtitle,
  message,
  onAccept,
  onCancel,
  onClose
}: Props): ReactElement => {
  const intl = useIntl()

  return (
    <Dialog open={open} onClose={onClose} padding="none">
      <div className="flex p-4">
        <div className="w-1/6">
          <div className="w-14 h-14 p-2 bg-slate-500 rounded-full flex justify-center items-center">
            <ExclamationTriangleIcon className="w-full h-full text-white" />
          </div>
        </div>
        <div className="h-5/6">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-slate-700">{subtitle}</p>
          <p className="mt-4 text-slate-700">{message}</p>
        </div>
      </div>
      <div className="flex bg-slate-100 justify-evenly py-2">
        <Button margin="none" color="red" onClick={onCancel}>
          {intl.formatMessage(actionsMessages.cancel)}
        </Button>
        <Button margin="none" variant="contained" onClick={onAccept}>
          {intl.formatMessage(actionsMessages.confirm)}
        </Button>
      </div>
    </Dialog>
  )
}

export default ConfirmDialog
