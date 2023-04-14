import { ReactElement, useState, useEffect } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Dialog from 'components/Dialog'
import Button from 'components/Button'
import TextField from 'components/Form/Textfield'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { techniquesDeleteDialogMessages } from '../messages'

interface Props {
  open?: boolean
  selected?: Number
  onClose?: (event?: any) => void
  onAccept?: () => void
}

const DeleteDialog = ({
  open = true,
  onClose = () => {},
  onAccept = () => {},
  selected = 1
}: Props): ReactElement => {
  const getMessage = useFormatMessage(techniquesDeleteDialogMessages)
  const getGlobalMessage = useGlobalMessage()
  const [firstConfirmation, setFirstConfirmation] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFirstConfirmation(false)
        setPasswordError(false)
        setPassword('')
      }, 300)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 m-auto mb-2" />
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {getMessage('title', { selected })}
          </h3>
          <p className="text-sm text-gray-500 mt-1 mb-2">
            {getMessage(
              firstConfirmation ? 'passwordConfirmMessage' : 'message',
              {
                selected
              }
            )}
          </p>
        </div>

        {firstConfirmation && (
          <div className="w-full">
            <TextField
              id="password"
              name="password"
              type="password"
              label={getGlobalMessage('password', 'formMessages')}
              value={password}
              onChange={(e) => {
                setPasswordError(false)
                setPassword(e.target.value)
              }}
              helperText={
                passwordError
                  ? getGlobalMessage('required', 'formMessages')
                  : undefined
              }
            />
          </div>
        )}
      </div>

      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        {firstConfirmation ? (
          <Button
            variant="contained"
            color="red"
            onClick={() => {
              if (!password) {
                setPasswordError(true)
              } else {
                onAccept()
              }
            }}
          >
            {getGlobalMessage('accept', 'actionsMessages')}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="red"
            onClick={() => setFirstConfirmation(true)}
          >
            {getGlobalMessage('accept', 'actionsMessages')}
          </Button>
        )}

        <Button variant="contained" color="secondary" onClick={onClose}>
          {getGlobalMessage('cancel', 'actionsMessages')}
        </Button>
      </div>
    </Dialog>
  )
}

export default DeleteDialog
