import { ReactElement, useState, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'

import DragDrop from 'components/Form/DragDrop'

import AudioItem from './AudioItem'
import { usePins } from 'context/Pins'
import { pins as dummypin } from 'dumy/data'
import Autocomplete from 'components/Form/Autocomplete'
import Dialog from 'components/Dialog'
import Checkbox from 'components/Form/Checkbox'

import { formDialogMessages } from '../messages'
import { actionsMessages } from 'globalMessages'

interface FormValues {
  pin: string
  save_embedding: boolean
  current: boolean
}

interface Props {
  open?: boolean
  onClose?: (event?: any) => void
  onSubmit?: (values?: any) => void
}
const FormDialog = ({
  open = true,
  onClose = () => {},
  onSubmit = () => {}
}: Props): ReactElement => {
  const intl = useIntl()
  const { listOfPins, actions } = usePins()
  const [audios, setAudios] = useState([])

  const getMessage = (key: string): string =>
    intl.formatMessage(formDialogMessages[key])
  const pins = useMemo(
    () =>
      (listOfPins.length ? listOfPins : dummypin).map(item => ({
        value: item.number,
        text: item.number
      })),
    []
  )

  const handleDelete = (index: number): void => {
    const prev = [...audios]
    prev.splice(index, 1)
    setAudios(prev)
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      pin: '',
      current: true,
      save_embedding: true
    },
    onSubmit: values => {
      onSubmit({
        ...values,
        audios
      })
    }
  })

  const valid = useMemo(() => {
    return Boolean(formik.values.pin) && Boolean(audios.length)
  }, [formik.values, audios])

  useEffect(() => {
    actions?.getPins()
  }, [])

  useEffect(() => {
    if (open) {
      formik.resetForm()
      setAudios([])
    }
  }, [open])

  return (
    <Dialog title="Grupo de control" open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-2">
          <Autocomplete
            label="Pin"
            placeholder={getMessage('pinplaceholder')}
            value={formik.values.pin}
            onChange={value => {
              formik.setFieldValue('pin', value)
            }}
            items={pins}
          />

          <div className="flex gap-3 justify-end my-4">
            <Checkbox
              id="current"
              name="current"
              checked={formik.values.current}
              onChange={formik.handleChange}
              label={getMessage('current')}
            />
            <Checkbox
              id="save_embedding"
              name="save_embedding"
              checked={formik.values.save_embedding}
              onChange={formik.handleChange}
              label={getMessage('embedding')}
            />
          </div>

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

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="inline-flex justify-center items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
            onClick={onClose}
          >
            {intl.formatMessage(actionsMessages.cancel)}
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
            disabled={!valid}
          >
            {intl.formatMessage(actionsMessages.save)}
          </button>
        </div>
      </form>
    </Dialog>
  )
}

export default FormDialog
