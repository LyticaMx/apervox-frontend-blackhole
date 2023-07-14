import { ReactElement, useEffect, useMemo, useState } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import Typography from 'components/Typography'
import {
  physicalDescriptionFormMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import { usePhysicalDescriptionOptions } from './hooks/usePhysicalDescriptionOptions'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'
import useToast from 'hooks/useToast'
import { useIntl } from 'react-intl'
import { TechniqueTabs } from 'types/technique'

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

const PhysicalDescriptionForm = (): ReactElement => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    bodyType: '',
    hairColor: '',
    hairLength: '',
    hairType: '',
    height: '',
    otherBody: '',
    otherHairColor: '',
    skinColor: '',
    weight: ''
  })
  const getMessage = useFormatMessage(physicalDescriptionFormMessages)
  const { formatMessage } = useIntl()
  const getGlobalMessage = useGlobalMessage()
  const { bodyTypes, skinTypes, hairColor, hairLength, hairTypes } =
    usePhysicalDescriptionOptions()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'physical-description')
  const { launchToast } = useToast()

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
    hairColor: yup.string().required(getMessage('required')),
    otherBody: yup
      .string()
      .when('bodyType', (value, field) =>
        value === 'other'
          ? yup.string().required(getMessage('required'))
          : field
      )
  })

  const getData = async (): Promise<void> => {
    try {
      const response = await actions.get()
      setInitialValues({
        bodyType: response.data.body_type ?? '',
        hairColor: response.data.hair_color ?? '',
        hairLength: response.data.hair_length ?? '',
        hairType: response.data.hair_type ?? '',
        height: response.data.height ?? '',
        otherBody: response.data.other_body ?? '',
        otherHairColor: response.data.other_color ?? '',
        skinColor: response.data.skin ?? '',
        weight: response.data.weight ?? ''
      })
    } catch {
      techniqueActions?.setActiveTab(TechniqueTabs.GENERAL_DATA)
    }
  }

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const body: Record<string, any> = {}
      if (values.height) body.height = parseFloat(values.height)
      if (values.weight) body.weight = parseFloat(values.weight)
      body.body_type = values.bodyType
      if (values.bodyType === 'other') {
        body.other_body = values.otherBody
      }
      body.skin = values.skinColor
      body.hair_type = values.hairType
      body.hair_length = values.hairLength
      body.hair_color = values.hairColor
      if (values.hairColor === 'other') {
        body.other_color = values.otherHairColor
      }

      await actions.update(body)
      launchToast({
        title: formatMessage(targetMetaFormMessages.updatedSuccessfully),
        type: 'Success'
      })
    } catch {}
  }

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        height: initialValues.height,
        weight: initialValues.weight,
        bodyType: initialValues.bodyType,
        otherBody: initialValues.otherBody,
        skinColor: initialValues.skinColor,
        hairType: initialValues.hairType,
        hairLength: initialValues.hairLength,
        hairColor: initialValues.hairColor,
        otherHairColor: initialValues.otherHairColor
      },
      validationSchema,
      onSubmit: handleSubmit,
      enableReinitialize: true
    }),
    [initialValues]
  )

  useEffect(() => {
    getData()
  }, [target?.id])

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
