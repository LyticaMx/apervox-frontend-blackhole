import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import { useGlobalMessage } from 'hooks/useIntl'
import { academicFormMessages } from 'views/Technique/messages'

interface FormValues extends AddressFormValues {
  name: string
  phone: string
  email: string
}

const AcademicForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { addressFields, addressValidationSchema } = useAddressForm('address')
  const getGlobalMessage = useGlobalMessage()

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'academic-name',
        label: formatMessage(academicFormMessages.academicName),
        placeholder: formatMessage(academicFormMessages.academicNamePlaceholder)
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        id: 'academic-email',
        label: getGlobalMessage('email', 'formMessages'),
        placeholder: formatMessage(
          academicFormMessages.academicEmailPlaceholder
        )
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'academic-phone',
        label: formatMessage(academicFormMessages.academicPhone),
        placeholder: formatMessage(
          academicFormMessages.academicPhonePlaceholder
        )
      },
      breakpoints: { xs: 3 }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      email: yup
        .string()
        .trim()
        .email(formatMessage(formMessages.invalidEmail))
        .required(formatMessage(formMessages.required)),
      phone: yup.string().required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(academicFormMessages.institutionAddress),
        className: 'text-primary uppercase mt-2'
      }
    }
  ]

  return (
    <div>
      <AccordionForm<FormValues | AddressFormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(academicFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(academicFormMessages.itemTitle)}
        withSections={{
          renderMainSection: true,
          sections
        }}
      />
    </div>
  )
}

export default AcademicForm
