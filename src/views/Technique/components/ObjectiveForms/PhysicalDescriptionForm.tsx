import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import Typography from 'components/Typography'
import { physicalDescriptionFormMessages } from 'views/Techniques/messages'

interface FormValues {
  height: string
  weight: string
  bodyType: string
  skinColor: string
  hairType: string
  hairColor: string
}

interface Props {
  initialValues?: FormValues
}

const PhysicalDescriptionForm = ({ initialValues }: Props): ReactElement => {
  const getMessage = useFormatMessage(physicalDescriptionFormMessages)
  const getGlobalMessage = useGlobalMessage()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'height',
      options: {
        id: 'physical-description-height',
        label: getMessage('height'),
        placeholder: getMessage('heightPlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'weight',
      options: {
        id: 'physical-description-weight',
        label: getMessage('weight'),
        placeholder: getMessage('weightPlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'bodyType',
      options: {
        id: 'physical-description-body-type',
        label: getMessage('bodyType'),
        placeholder: getMessage('bodyTypePlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'select',
      name: 'skinColor',
      options: {
        label: getMessage('skinColor'),
        clearable: true,
        placeholder: getMessage('skinColorPlaceholder'),
        items: [
          {
            id: '1',
            label: getMessage('lightSkin')
          },
          {
            id: '2',
            label: getMessage('darkSkin')
          },
          {
            id: '3',
            label: getMessage('whiteSkin')
          }
        ],
        textField: 'label',
        valueField: 'id',
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: 'w-[95%]'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'select',
      name: 'hairType',
      options: {
        label: getMessage('hairType'),
        clearable: true,
        placeholder: getMessage('hairTypePlaceholder'),
        items: [
          {
            id: '1',
            label: getMessage('shortCurly')
          },
          {
            id: '2',
            label: getMessage('longCurly')
          },
          {
            id: '3',
            label: getMessage('shortWavy')
          },
          {
            id: '4',
            label: getMessage('longWavy')
          }
        ],
        textField: 'label',
        valueField: 'id',
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: 'w-[95%]'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'hairColor',
      options: {
        id: 'physical-description-hair-color',
        label: getMessage('hairColor'),
        placeholder: getMessage('hairColorPlaceholder')
      },
      breakpoints: { xs: 3 }
    }
  ]

  const validationSchema = yup.object({
    height: yup.string().required(getMessage('required')),
    weight: yup.string().required(getMessage('required')),
    bodyType: yup.string().required(getMessage('required')),
    skinColor: yup.string().required(getMessage('required')),
    hairType: yup.string().required(getMessage('required')),
    hairColor: yup.array().required(getMessage('required'))
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        height: initialValues?.height ?? '',
        weight: initialValues?.weight ?? '',
        bodyType: initialValues?.bodyType ?? '',
        skinColor: initialValues?.skinColor ?? '',
        hairType: initialValues?.hairType ?? '',
        hairColor: initialValues?.hairColor ?? ''
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values)
      }
    }),
    [initialValues]
  )

  return (
    <div className="w-full">
      <Typography variant="title" style="bold" className="uppercase mb-2">
        {getMessage('title')}
      </Typography>

      <div className="bg-white p-2 py-4 rounded-md">
        <Form
          formikConfig={formikConfig}
          fields={fields}
          submitButtonPosition="right"
          submitButtonLabel={getGlobalMessage('save', 'actionsMessages')}
          submitButtonProps={{
            color: 'indigo',
            variant: 'contained'
          }}
          className="user-account-data-form"
        />
      </div>
    </div>
  )
}

export default PhysicalDescriptionForm
