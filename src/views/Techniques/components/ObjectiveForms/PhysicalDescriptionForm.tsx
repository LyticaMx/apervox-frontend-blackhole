import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { formMessages } from 'globalMessages'
import Typography from 'components/Typography'

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
  const getMessage = useFormatMessage(formMessages)
  const getGlobalMessage = useGlobalMessage()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'height',
      options: {
        id: 'physical-description-height',
        label: 'Altura',
        placeholder: 'Ej. 170 cm'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'weight',
      options: {
        id: 'physical-description-weight',
        label: 'Peso',
        placeholder: 'Ej. 70 kg'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'bodyType',
      options: {
        id: 'physical-description-body-type',
        label: 'Tipo de cuerpo',
        placeholder: 'Ej. Ectomorfo'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'select',
      name: 'skinColor',
      options: {
        label: 'Color de piel',
        clearable: true,
        placeholder: 'Ej. Piel clara',
        items: [
          {
            id: '1',
            label: 'Piel clara'
          },
          {
            id: '2',
            label: 'Piel Oscura'
          },
          {
            id: '3',
            label: 'Piel blanca'
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
        label: 'Tipo de cabello',
        clearable: true,
        placeholder: 'Ej. Corto, ondulado',
        items: [
          {
            id: '1',
            label: 'Corto, ondulado'
          },
          {
            id: '2',
            label: 'Largo, ondulado'
          },
          {
            id: '3',
            label: 'Corto, quebrado'
          },
          {
            id: '4',
            label: 'Largo, quebrado'
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
        label: 'Color de cabello',
        placeholder: 'Ej. Castaño'
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
        Descipción Fisíca
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
