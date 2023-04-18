import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  targetFormsGeneralMessages,
  organizationFormMessages
} from 'views/Techniques/messages'

interface FormValues extends AddressFormValues {
  name: string
  phone: string
  email: string
}

const OrganizationsForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { addressFields, addressValidationSchema } = useAddressForm('address')

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'organization-name',
        label: formatMessage(organizationFormMessages.organizationName),
        placeholder: formatMessage(
          organizationFormMessages.organizationNamePlaceholder
        )
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        id: 'organization-email',
        label: formatMessage(formMessages.email),
        placeholder: formatMessage(
          targetFormsGeneralMessages.emailPlaceholder
        )
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'organization-phone',
        label: formatMessage(targetFormsGeneralMessages.phone),
        placeholder: formatMessage(
          targetFormsGeneralMessages.phonePlaceholder
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
        text: formatMessage(organizationFormMessages.organizationAddress),
        className: 'text-primary uppercase mt-2'
      }
    }
  ]

  return (
    <div>
      <AccordionForm<FormValues | AddressFormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(organizationFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(organizationFormMessages.itemTitle)}
        withSections={{
          renderMainSection: true,
          sections
        }}
      />
    </div>
  )
}

export default OrganizationsForm
