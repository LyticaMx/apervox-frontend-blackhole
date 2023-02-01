import { ReactElement, useEffect, useMemo, useState } from 'react'
import {
  XCircleIcon,
  TrashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

import Table from 'components/Table'

import { ControlAudio } from 'types/control'

import { audiosMessages } from '../messages'
import DeleteAudioDialog from './DeleteDialog'
import { useFormatMessage } from 'hooks/useIntl'
import { useToggle } from 'hooks/useToggle'
import { useControlGroups } from 'context/ControlGroups'
import EmbeddingDialog from './EmbeddingDialog'
import AddAudiosDialog from './AddAudiosDialog'
import Button from 'components/Button'
import useAudio from '../hooks/useAudio'

const AudiosSection = (): ReactElement => {
  const { actions, audios, controlGroup } = useControlGroups()
  const [AudioButton, stopAudio] = useAudio()
  const getMessage = useFormatMessage(audiosMessages)
  const [deleteOpen, deleteToggle] = useToggle()
  const [addAudiosOpen, addAudiosToggle] = useToggle()
  const [embeddingOpen, embeddingToggle] = useToggle()
  const [audio, setAudio] = useState<ControlAudio | undefined>()

  useEffect(() => {
    stopAudio()

    return () => {
      stopAudio()
    }
  }, [audios])

  const handleClick = (row): void => {
    setAudio(row)
    deleteToggle()
  }

  const handleClose = (): void => {
    deleteToggle()

    setTimeout(() => {
      setAudio(undefined)
    }, 300)
  }
  const handleAccept = async (): Promise<void> => {
    if (audio && controlGroup) {
      await actions?.deleteAudio(audio.id)

      deleteToggle()
    }
  }

  const handleAddAudios = async (audios: File[]): Promise<void> => {
    await actions?.addAudios({
      group_id: controlGroup?.id ?? '',
      audios
    })

    addAudiosToggle()
  }

  const handleCreateEmbedding = async (): Promise<void> => {
    await actions?.createEmbedding(controlGroup?.id ?? '')

    embeddingToggle()
  }

  const columns = useMemo(
    () => [
      {
        header: getMessage('tableAudio'),
        accessorKey: 'name',
        cell: (info: any) => (
          <span className="font-bold"> {info.getValue()}</span>
        )
      },
      {
        header: getMessage('tableLoadingDate'),
        accessorKey: 'loading_date'
      },
      {
        header: ' ',
        cell: (info) => (
          <div className="flex gap-2 justify-center">
            <AudioButton id={info.row.original.id} />
            <TrashIcon
              className="w-5 h-5 text-red-500 cursor-pointer"
              onClick={() => {
                handleClick(info.row.original)
              }}
            />
          </div>
        )
      }
    ],
    [AudioButton]
  )

  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {getMessage('title')}
          </h1>
          <div className="flex gap-3 mt-2 text-sm ">
            <p className="font-semibold">PIN: {controlGroup?.pin}</p>
            <p className="text-gray-700 mx-4">{controlGroup?.id}</p>
            <p className="font-semibold flex gap-1">
              {controlGroup?.embedding_generate && (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              )}
              {!controlGroup?.embedding_generate && (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              )}
              {getMessage(
                controlGroup?.embedding_generate
                  ? 'hasEmbedding'
                  : 'noEmbedding'
              )}
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none gap-2 flex">
          <Button variant="contained" color="blue" onClick={addAudiosToggle}>
            {getMessage('buttonAddAudio')}
          </Button>
          {!controlGroup?.embedding_generate && (
            <Button variant="contained" color="blue" onClick={embeddingToggle}>
              {getMessage('buttonCreateEmbedding')}
            </Button>
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <Table data={audios} columns={columns} />
          </div>
        </div>
      </div>

      <AddAudiosDialog
        groupId={controlGroup?.id ?? ''}
        open={addAudiosOpen}
        onClose={addAudiosToggle}
        onSubmit={handleAddAudios}
      />
      <EmbeddingDialog
        open={embeddingOpen}
        onClose={embeddingToggle}
        onAccept={() => {
          handleCreateEmbedding()
        }}
      />
      <DeleteAudioDialog
        open={deleteOpen}
        onClose={handleClose}
        audioName={audio?.name}
        groupName={controlGroup?.uid ?? ''}
        onAccept={handleAccept}
      />
    </section>
  )
}

export default AudiosSection
