import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field, Section } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import Typography from 'components/Typography'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  objectiveFormsGeneralMessages,
  personalDataFormMessages
} from 'views/Techniques/messages'
import { useIntl } from 'react-intl'

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
  const getMessage = useFormatMessage(personalDataFormMessages)
  const { formatMessage } = useIntl()
  const getGlobalMessage = useGlobalMessage()
  const { addressFields, addressValidationSchema } = useAddressForm('address')

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'personal-data-name',
        label: getMessage('targetName'),
        placeholder: getMessage('targetNamePlaceholder')
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'personal-data-phone',
        label: getMessage('targetPhone'),
        placeholder: formatMessage(
          objectiveFormsGeneralMessages.phonePlaceholder
        )
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'select',
      name: 'gender',
      options: {
        label: getMessage('gender'),
        clearable: true,
        placeholder: getMessage('genderPlaceholder'),
        items: [
          {
            id: '1',
            label: getMessage('male')
          },
          {
            id: '2',
            label: getMessage('female')
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
        label: getMessage('birthDate'),
        placeholder: getMessage('birthDatePlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'age',
      options: {
        id: 'personal-data-age',
        label: getMessage('age'),
        placeholder: getMessage('agePlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'curp',
      options: {
        id: 'personal-data-curp',
        label: 'CURP',
        placeholder: getMessage('curpPlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'rfc',
      options: {
        id: 'personal-data-rfc',
        label: 'RFC',
        placeholder: getMessage('rfcPlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'nationality',
      options: {
        id: 'personal-data-nationality',
        label: getMessage('nationality'),
        placeholder: getMessage('nationalityPlaceholder')
      },
      breakpoints: { xs: 3 }
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

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: getMessage('actualAddress'),
        className: 'text-primary uppercase mt-2'
      }
    }
  ]

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
          withSections={{
            renderMainSection: true,
            sections
          }}
        />
      </div>
    </div>
  )
}

export default PersonalDataForm
