import clsx from 'clsx'
import Form from 'components/Form'
import Typography from 'components/Typography'
import { FormikConfig } from 'formik'
import {
  actionsMessages,
  formMessages,
  generalMessages,
  platformMessages
} from 'globalMessages'
import { ReactElement, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import { mediaMessages } from '../messages'
import * as yup from 'yup'

interface FormValues {
  name: string
  media?: string
}

interface Props {
  onAccept: (data: FormValues, type: 'media' | 'device') => Promise<void>
  subtitle: string
}

const MediaDrawer = (props: Props): ReactElement => {
  const { subtitle, onAccept } = props
  const [formType, setFormType] = useState<'media' | 'device'>('media')
  const { formatMessage } = useIntl()

  const validationSchema = yup.object({
    name: yup.string().required(formatMessage(formMessages.required)),
    media: yup.string().test({
      name: 'ifRequired',
      message: formatMessage(formMessages.required),
      test: (value) => !!value || formType === 'media'
    })
  })

  const fields = useMemo<Array<Field<FormValues>>>(() => {
    if (formType === 'media') {
      return [
        {
          type: 'text',
          name: 'name',
          options: {
            id: 'name',
            label: formatMessage(mediaMessages.mediaName),
            placeholder: formatMessage(mediaMessages.mediaNamePlaceholder)
          }
        }
      ]
    }
    return [
      {
        type: 'select',
        name: 'media',
        options: {
          clearable: false,
          items: [
            {
              text: 'ETSI',
              value: 'etsi'
            },
            {
              text: 'FXS/FXSO',
              value: 'fxs/fxso'
            }
          ],
          textField: 'text',
          valueField: 'value',
          label: formatMessage(mediaMessages.mediaName),
          placeholder: formatMessage(mediaMessages.mediaNamePlaceholder),
          optionsContainerClassname: 'w-[95%]'
        }
      },
      {
        type: 'text',
        name: 'name',
        options: {
          id: 'name',
          label: formatMessage(mediaMessages.deviceName),
          placeholder: formatMessage(mediaMessages.deviceNamePlaceholder)
        }
      }
    ]
  }, [formType])

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: { name: '', media: '' },
    onSubmit: async (values) => {
      console.log(values)
      onAccept(values, formType)
    },
    validationSchema
  }

  return (
    <div className="w-96">
      <Typography>{subtitle}</Typography>
      <div className="flex py-2">
        <button
          className={clsx(
            'text-secondary-gray mr-5 font-medium px-2 py-1 rounded-md hover:bg-[#F4F9FF] hover:text-primary',
            formType === 'media' && 'bg-[#F4F9FF] !text-primary'
          )}
          onClick={() => setFormType('media')}
        >
          {formatMessage(platformMessages.inputMedium)}
        </button>
        <button
          className={clsx(
            'text-secondary-gray mr-5 font-medium px-2 py-1 rounded-md hover:bg-[#F4F9FF] hover:text-primary',
            formType === 'device' && 'bg-[#F4F9FF] !text-primary'
          )}
          onClick={() => setFormType('device')}
        >
          {formatMessage(generalMessages.device)}
        </button>
      </div>
      <Typography>
        {formatMessage(mediaMessages.completeToAddMediaOrDevice, {
          type: formType
        })}
      </Typography>
      <Form
        className="mt-4"
        fields={fields}
        formikConfig={formikConfig}
        submitButtonLabel={formatMessage(actionsMessages.save)}
        submitButtonPosition="right"
        submitButtonProps={{
          color: 'primary',
          variant: 'contained',
          className: 'mt-4'
        }}
      />
    </div>
  )
}

export default MediaDrawer
