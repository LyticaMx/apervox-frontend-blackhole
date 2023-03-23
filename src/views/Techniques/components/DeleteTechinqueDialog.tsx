import { ReactElement, useState, useEffect } from 'react'
import { useToggle } from 'usehooks-ts'
import clsx from 'clsx'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import Dialog from 'components/Dialog'
import Button from 'components/Button'
import TextField from 'components/Form/Textfield'
import Checkbox from 'components/Form/Checkbox'
import Typography from 'components/Typography'

import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'

import { techniquesDeleteDialogMessages } from '../messages'

export type EliminationType = 'completely' | 'onlyFiles'

interface Props {
  open?: boolean
  onClose?: (event?: any) => void
  onAccept?: (eliminationType: EliminationType) => void
}

const DeleteTechinqueDialog = ({
  open = true,
  onClose = () => {},
  onAccept = () => {}
}: Props): ReactElement => {
  const getMessage = useFormatMessage(techniquesDeleteDialogMessages)
  const getGlobalMessage = useGlobalMessage()
  const [hazardConfirm, toggleHazard] = useToggle(false)

  const [firstConfirmation, setFirstConfirmation] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [password, setPassword] = useState('')
  const [eliminationType, setEliminationType] =
    useState<EliminationType>('completely')

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFirstConfirmation(false)
        setPasswordError(false)
        setPassword('')
      }, 300)
    }
  }, [open])

  const removeTechinque = (type: EliminationType): void => {
    setEliminationType(type)
    setFirstConfirmation(true)
  }

  return (
    <Dialog open={open} onClose={onClose} size="md" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 m-auto mb-2" />
          <Typography variant="subtitle" style="semibold">
            {getMessage('title')}
          </Typography>

          {!firstConfirmation && (
            <Typography className="mt-1 mb-2">
              {getMessage('message')}
            </Typography>
          )}
        </div>

        {firstConfirmation && (
          <div className="w-full px-4">
            <div className="flex">
              <Checkbox className="mt-2 mr-2" onChange={toggleHazard} />
              <Typography>{getMessage('hazardConfirmation')}</Typography>
            </div>
            <Typography className="my-2">
              {getMessage('passwordConfirmMessage')}
            </Typography>
            <TextField
              id="password"
              name="password"
              type="password"
              label={getGlobalMessage('password', 'formMessages')}
              labelSpacing={'1'}
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

      <div
        className={clsx(
          'flex px-4 pb-8 gap-2',
          firstConfirmation
            ? 'flex-row justify-center'
            : 'flex-col items-center'
        )}
      >
        {firstConfirmation ? (
          <Button
            variant="contained"
            color="red"
            disabled={!hazardConfirm}
            onClick={() => {
              if (!password) {
                setPasswordError(true)
              } else {
                onAccept(eliminationType)
              }
            }}
          >
            {getGlobalMessage('delete', 'actionsMessages')}
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="red"
              onClick={() => removeTechinque('completely')}
            >
              {getMessage('removeCompletely')}
            </Button>
            <Button
              variant="contained"
              color="red"
              onClick={() => removeTechinque('onlyFiles')}
            >
              {getMessage('removeOnlyFiles')}
            </Button>
          </>
        )}

        <Button variant="contained" color="secondary" onClick={onClose}>
          {getGlobalMessage('cancel', 'actionsMessages')}
        </Button>
      </div>
    </Dialog>
  )
}

export default DeleteTechinqueDialog
