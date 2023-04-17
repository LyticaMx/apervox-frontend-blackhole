import { ReactElement } from 'react'
import Dialog from 'components/Dialog'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useFormatMessage } from 'hooks/useIntl'
import { newPasswordMessages } from '../messages'
import Button from 'components/Button'

interface Props {
  newPassword: string
  onClose: () => void
}

const NewPasswordDialog = (props: Props): ReactElement => {
  const getMessage = useFormatMessage(newPasswordMessages)

  return (
    <Dialog
      open={!!props.newPassword}
      onClose={props.onClose}
      size="sm"
      padding="none"
    >
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-primary m-auto mb-2" />

          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {getMessage('title')}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {getMessage('message', {
              password: (
                <span className="text-primary font-bold">
                  {props.newPassword}
                </span>
              )
            })}
          </p>
        </div>
      </div>

      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="contained" color="primary" onClick={props.onClose}>
          {getMessage('accept')}
        </Button>
      </div>
    </Dialog>
  )
}

export default NewPasswordDialog
