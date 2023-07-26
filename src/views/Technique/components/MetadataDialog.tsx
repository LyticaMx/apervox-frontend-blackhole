import { ReactElement, useEffect, useMemo, useState } from 'react'
import Dialog from 'components/Dialog'
import Typography from 'components/Typography'
import { ExclamationCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import SelectPaginate from 'components/Form/SelectPaginate'
import TextField from 'components/Form/Textfield'
import Button from 'components/Button'
import { useGlobalMessage } from 'hooks/useIntl'
import clsx from 'clsx'
import { useIntl } from 'react-intl'
import { platformMessages } from 'globalMessages'
import { useTargets } from 'context/Targets'
import { createMetadataDialogMessages } from '../messages'

interface Props {
  targetId: string
  open: boolean
  onClose: () => void
  onSubmit: () => void
}

const MetadataDialog = (props: Props): ReactElement => {
  const { actions } = useTargets()
  const [metadata, setMetadata] = useState<any>(null)
  const [alias, setAlias] = useState<string>('')
  const getGlobalMessage = useGlobalMessage()
  const { formatMessage } = useIntl()

  const [accion, setAccion] = useState<'crear' | 'vincular'>('crear')
  const personaldata = useMemo(
    () => metadata?.data?.personal_data ?? null,
    [metadata?.data]
  )

  const disabled = useMemo(() => {
    if (accion === 'crear') return !alias.length
    if (accion === 'vincular') return !metadata

    return false
  }, [alias, metadata, accion])

  const handleSubmit = async (): Promise<void> => {
    let res: any = false

    switch (accion) {
      case 'crear':
        res = await actions?.createMetadata(props.targetId, alias)
        break
      case 'vincular':
        res = await actions?.linkMetadata(props.targetId, metadata.value)
        break
    }

    if (res) {
      props.onSubmit()
    }
  }

  useEffect(() => {
    setMetadata(null)
    setAlias('')
  }, [accion, props.open])

  const buttonclass =
    'inline-flex w-20 cursor-pointer select-none appearance-none items-center justify-center rounded px-3 py-2 text-sm font-medium text-gray-800 transition focus:outline-none'

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      size="md"
      overflow="visible"
    >
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <ExclamationCircleIcon className="h-6 w-6 text-red-500 m-auto mb-2" />

          <Typography
            style="semibold"
            variant="subtitle"
            className="inline-flex items-center gap-2"
          >
            {formatMessage(createMetadataDialogMessages.title)}
          </Typography>
          <Typography variant="body2">
            {formatMessage(createMetadataDialogMessages.message)}
          </Typography>

          <div className="relative z-0 inline-flex space-x-0.5 rounded border border-gray-200 p-0.5 mt-2 mx-auto">
            <button
              type="button"
              className={clsx(buttonclass, {
                'bg-primary !text-white': accion === 'crear'
              })}
              onClick={() => setAccion('crear')}
            >
              {getGlobalMessage('create', 'actionsMessages')}
            </button>
            <button
              type="button"
              className={clsx(buttonclass, {
                'bg-primary !text-white': accion === 'vincular'
              })}
              onClick={() => setAccion('vincular')}
            >
              {getGlobalMessage('link', 'actionsMessages')}
            </button>
          </div>
        </div>
      </div>

      {accion === 'vincular' ? (
        <div>
          <SelectPaginate
            label="Objetivo - metadata"
            value={metadata}
            onChange={setMetadata}
            asyncProps={{
              api: { endpoint: 'target-metadata', method: 'get' },
              value: 'id',
              label: 'unique_alias',
              searchField: 'unique_alias',
              fullObject: true
            }}
          />

          {personaldata ? (
            <div className="flex flex-col border rounded-md p-3 mt-2">
              <div className="flex gap-2 items-center">
                <UserIcon className="w-5 h-5" />
                <Typography style="semibold">
                  {personaldata.full_name}
                </Typography>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <Typography variant="body2">
                    <span className="font-semibold mr-1">
                      {formatMessage(platformMessages.phoneNumber)}:
                    </span>
                    {personaldata.phone_number}
                  </Typography>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {accion === 'crear' ? (
        <div>
          <TextField
            label="Alias / Nombre del objetivo"
            labelSpacing="1"
            value={alias}
            onChange={(e: any) => setAlias(e.target.value)}
          />
        </div>
      ) : null}

      <div className=" px-4 pb-8 sm:flex gap-2 justify-center mt-4">
        <Button
          variant="contained"
          className="bg-secondary-400 !bg-opacity-10 !text-secondary hover:!bg-opacity-100 hover:!text-white"
          onClick={props.onClose}
        >
          {getGlobalMessage('cancel', 'actionsMessages')}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={disabled}
        >
          {getGlobalMessage('accept', 'actionsMessages')}
        </Button>
      </div>
    </Dialog>
  )
}

export default MetadataDialog
