import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { formMessages } from 'globalMessages'
import Typography from 'components/Typography'
import { useAddressForm, AddressFormValues } from './useAddressForm'

interface FormValues extends AddressFormValues {
  name: string
  objectiveNumber: string
  gender: string
  birthdate: string
  age: string
  curp: string
  rfc: string
  nationality: string
}

interface Props {
  initialValues?: FormValues
}

const PersonalDataForm = ({ initialValues }: Props): ReactElement => {
  const getMessage = useFormatMessage(formMessages)
  const getGlobalMessage = useGlobalMessage()
  const { addressFields, addressValidationSchema } = useAddressForm()

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'personal-data-name',
        label: 'Alias / Nombre del objetivo',
        placeholder: 'Ej. José Mendez'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'personal-data-phone',
        label: 'Número del objetivo',
        placeholder: 'Ej. 5533445566'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'select',
      name: 'gender',
      options: {
        label: 'Género',
        clearable: true,
        placeholder: 'Ej. Masculino',
        items: [
          {
            id: '1',
            label: 'Masculino'
          },
          {
            id: '2',
            label: 'Feménino'
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
      name: 'birthdate',
      options: {
        id: 'personal-data-birthdate',
        label: 'Fecha de nacimiento',
        placeholder: 'Ej. 12/12/2022 - 13:00:00'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'age',
      options: {
        id: 'personal-data-age',
        label: 'Edad',
        placeholder: 'Ej. 30 años'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'curp',
      options: {
        id: 'personal-data-curp',
        label: 'CURP',
        placeholder: 'Ej. AAAA0000MAAAAA00'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'rfc',
      options: {
        id: 'personal-data-rfc',
        label: 'CURP',
        placeholder: 'Ej. AAAA0000XXX'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'nationality',
      options: {
        id: 'personal-data-nationality',
        label: 'Nacionalidad',
        placeholder: 'Ej. Mexicana'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'custom',
      name: 'addressTitle',
      children: (
        <Typography variant="body1" className="text-primary uppercase mt-2">
          Domicilio actual
        </Typography>
      ),
      breakpoints: { xs: 12 }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      height: yup.string().required(getMessage('required')),
      weight: yup.string().required(getMessage('required')),
      bodyType: yup.string().required(getMessage('required')),
      skinColor: yup.string().required(getMessage('required')),
      hairType: yup.string().required(getMessage('required')),
      hairColor: yup.array().required(getMessage('required'))
    })
    .concat(addressValidationSchema)

  const formikConfig = useMemo<FormikConfig<FormValues | AddressFormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        objectiveNumber: initialValues?.objectiveNumber ?? '',
        gender: initialValues?.gender ?? '',
        birthdate: initialValues?.birthdate ?? '',
        age: initialValues?.age ?? '',
        curp: initialValues?.curp ?? '',
        rfc: initialValues?.rfc ?? '',
        nationality: initialValues?.nationality ?? '',
        state: initialValues?.state ?? '',
        municipality: initialValues?.municipality ?? '',
        postalCode: initialValues?.postalCode ?? '',
        colony: initialValues?.colony ?? '',
        street: initialValues?.street ?? '',
        number: initialValues?.number ?? ''
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
        Datos Personales, Biométricos y Domicilio
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

export default PersonalDataForm
