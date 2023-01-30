import { ReactElement, useState, useEffect, useMemo } from 'react'

import DragDrop from 'components/Form/DragDrop'

import AudioItem from './AudioItem'

import Dialog from 'components/Dialog'

import { addAudiosMessages } from '../messages'
import { PlusIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Checkbox from 'components/Form/Checkbox'
import { useFormatMessage } from 'hooks/useIntl'
import { useToggle } from 'hooks/useToggle'

interface Props {
  open?: boolean
  groupId?: string
  onClose?: (event?: any) => void
  onSubmit?: (values?: any) => void
}
const AddAudiosDialog = ({
  open = true,
  groupId,
  onClose = () => {},
  onSubmit = () => {}
}: Props): ReactElement => {
  const getMessage = useFormatMessage(addAudiosMessages)
  const [audios, setAudios] = useState([])
  const [accept, acceptToggle, setAccept] = useToggle()

  const handleDelete = (index: number): void => {
    const prev = [...audios]
    prev.splice(index, 1)
    setAudios(prev)
  }

  const valid = useMemo(() => {
    return Boolean(audios.length) && accept
  }, [audios, accept])

  useEffect(() => {
    if (open) {
      setAudios([])
      setAccept(false)
    }
  }, [open])

  return (
    <Dialog padding="none" open={open} onClose={onClose}>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
            <PlusIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {getMessage('title', { groupId })}
            </h3>
            <div className="mt-1 mb-2">
              <p className="text-sm text-gray-500">
                {getMessage('userLinkedAction')}
              </p>
            </div>
            <Checkbox
              label={getMessage('userAcceptAction')}
              checked={accept}
              onChange={acceptToggle}
            />
          </div>
        </div>
      </div>

      <div className="px-4 pb-5">
        <div className="mt-2">
          <DragDrop
            onChange={setAudios}
            accept={{
              'audio/wav': [],
              'audio/ogg': []
            }}
            maxFiles={10}
          />
          {Boolean(audios.length) && (
            <section className="mt-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium leading-6 text-gray-900">
                  Audios
                </span>
                <button
                  className="text-sm font-normal  text-blue-500"
                  onClick={() => {
                    setAudios([])
                  }}
                >
                  {getMessage('removeAll')}
                </button>
              </div>

              <ul className="w-full mt-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 ">
                {audios.map((audio: File, index) => (
                  <AudioItem
                    key={index}
                    onDelete={() => {
                      handleDelete(index)
                    }}
                  >
                    {audio.name}
                  </AudioItem>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="mt-4 sm:flex sm:flex-row-reverse gap-4">
          <Button
            margin="none"
            variant="contained"
            color="blue"
            disabled={!valid}
            onClick={() => {
              onSubmit(audios)
            }}
          >
            {getMessage('save')}
          </Button>
          <Button margin="none" variant="outlined" onClick={onClose}>
            {getMessage('cancel')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default AddAudiosDialog
