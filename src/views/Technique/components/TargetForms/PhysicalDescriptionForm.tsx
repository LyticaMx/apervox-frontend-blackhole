import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import Typography from 'components/Typography'
import { physicalDescriptionFormMessages } from 'views/Technique/messages'
import { usePhysicalDescriptionOptions } from './hooks/usePhysicalDescriptionOptions'

interface FormValues {
  height: string
  weight: string
  bodyType: string
  skinColor: string
  hairLength: string
  otherBody: string
  hairType: string
  hairColor: string
  otherHairColor: string
}

interface Props {
  initialValues?: FormValues
}

const PhysicalDescriptionForm = ({ initialValues }: Props): ReactElement => {
  const getMessage = useFormatMessage(physicalDescriptionFormMessages)
  const getGlobalMessage = useGlobalMessage()
  const { bodyTypes, skinTypes, hairColor, hairLength, hairTypes } =
    usePhysicalDescriptionOptions()

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
      type: 'select',
      name: 'bodyType',
      options: {
        label: getMessage('bodyType'),
        clearable: false,
        placeholder: getMessage('bodyTypePlaceholder'),
        items: bodyTypes,
        textField: 'text',
        valueField: 'value',
        optionsContainerClassname: '!w-full'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'otherBody',
      options: {
        id: 'physical-description-other-body',
        label: getMessage('otherBody'),
        placeholder: getMessage('otherBodyPlaceholder')
      },
      breakpoints: { xs: 3 },
      renderIf: {
        bodyType: 'other'
      }
    },
    {
      type: 'select',
      name: 'skinColor',
      options: {
        label: getMessage('skinColor'),
        clearable: false,
        placeholder: getMessage('skinColorPlaceholder'),
        items: skinTypes,
        textField: 'text',
        valueField: 'value',
        optionsContainerClassname: '!w-full'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'select',
      name: 'hairLength',
      options: {
        label: getMessage('hairLength'),
        clearable: false,
        placeholder: getMessage('hairLengthPlaceholder'),
        items: hairLength,
        textField: 'text',
        valueField: 'value',
        optionsContainerClassname: '!w-full'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'select',
      name: 'hairType',
      options: {
        label: getMessage('hairType'),
        clearable: false,
        placeholder: getMessage('hairTypePlaceholder'),
        items: hairTypes,
        textField: 'text',
        valueField: 'value',
        optionsContainerClassname: '!w-full'
      },
      breakpoints: { xs: 3 },
      renderIf: {
        '!hairLength': 'bald'
      }
    },
    {
      type: 'select',
      name: 'hairColor',
      options: {
        label: getMessage('hairColor'),
        clearable: false,
        placeholder: getMessage('hairColorPlaceholder'),
        items: hairColor,
        textField: 'text',
        valueField: 'value',
        optionsContainerClassname: '!w-full'
      },
      breakpoints: { xs: 3 },
      renderIf: {
        '!hairLength': 'bald'
      }
    },
    {
      type: 'text',
      name: 'otherHairColor',
      options: {
        id: 'other-hair-color',
        label: getMessage('otherHairColor'),
        placeholder: getMessage('otherHairColorPlaceholder')
      },
      breakpoints: { xs: 3 },
      renderIf: {
        hairColor: 'other'
      }
    }
  ]

  const validationSchema = yup.object({
    height: yup.string().required(getMessage('required')),
    weight: yup.string().required(getMessage('required')),
    bodyType: yup.string().required(getMessage('required')),
    skinColor: yup.string().required(getMessage('required')),
    hairType: yup.string().required(getMessage('required')),
    hairColor: yup.array().required(getMessage('required')),
    otherBody: yup
      .string()
      .when('bodyType', (value, field) =>
        value === 'other'
          ? yup.string().required(getMessage('required'))
          : field
      )
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        height: initialValues?.height ?? '',
        weight: initialValues?.weight ?? '',
        bodyType: initialValues?.bodyType ?? '',
        otherBody: initialValues?.otherBody ?? '',
        skinColor: initialValues?.skinColor ?? '',
        hairType: initialValues?.hairType ?? '',
        hairLength: initialValues?.hairLength ?? '',
        hairColor: initialValues?.hairColor ?? '',
        otherHairColor: initialValues?.otherHairColor ?? ''
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
