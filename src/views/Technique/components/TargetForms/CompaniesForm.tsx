import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  companiesFormMessages,
  targetFormsGeneralMessages
} from 'views/Techniques/messages'

interface FormValues extends AddressFormValues {
  name: string
  comments?: string
}

const CompaniesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const { addressFields, addressValidationSchema } = useAddressForm('address')

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'company-name',
        label: formatMessage(companiesFormMessages.companyName),
        placeholder: formatMessage(companiesFormMessages.companyNamePlaceholder)
      },
      breakpoints: { xs: 12, md: 4 }
    },
    ...addressFields,
    {
      type: 'text',
      name: 'comments',
      section: 'comments',
      options: {
        id: 'company-comments',
        label: formatMessage(targetFormsGeneralMessages.comments),
        placeholder: formatMessage(
          targetFormsGeneralMessages.commentsPlaceholder
        ),
        multiline: true,
        rows: 4
      },
      breakpoints: { xs: 12, md: 6 }
    }
  ]

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(companiesFormMessages.companyAddress),
        className: 'text-primary uppercase mt-2'
      }
    },
    {
      name: 'comments'
    }
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  return (
    <div>
      <AccordionForm<FormValues | AddressFormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(companiesFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(companiesFormMessages.itemTitle)}
        withSections={{
          renderMainSection: true,
          sections
        }}
      />
    </div>
  )
}

export default CompaniesForm
