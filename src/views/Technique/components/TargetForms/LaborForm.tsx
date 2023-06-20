import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  laborFormMessages,
  targetFormsGeneralMessages
} from 'views/Technique/messages'

interface FormValues extends AddressFormValues {
  name: string
  job: string
  phone: string
  email: string
}

const LaborForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { addressFields, addressValidationSchema } = useAddressForm('address')

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'organizationName',
      options: {
        id: 'labor-organization-name',
        label: formatMessage(laborFormMessages.organizationName),
        placeholder: formatMessage(
          laborFormMessages.organizationNamePlaceholder
        )
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'job',
      options: {
        id: 'labor-company-job',
        label: formatMessage(laborFormMessages.job),
        placeholder: formatMessage(laborFormMessages.jobPlaceholder)
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        id: 'labor-company-email',
        label: formatMessage(formMessages.email),
        placeholder: formatMessage(targetFormsGeneralMessages.emailPlaceholder)
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'labor-company-phone',
        label: formatMessage(targetFormsGeneralMessages.phone),
        placeholder: formatMessage(targetFormsGeneralMessages.phonePlaceholder)
      },
      breakpoints: { xs: 3 }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      job: yup.string().required(formatMessage(formMessages.required)),
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
        text: formatMessage(laborFormMessages.organizationAddress),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 1
    }
  ]

  return (
    <div>
      <AccordionForm<FormValues | AddressFormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(laborFormMessages.title)}
        itemTitle={formatMessage(laborFormMessages.itemTitle)}
        withSections={{
          renderMainSection: true,
          sections
        }}
      />
    </div>
  )
}

export default LaborForm
