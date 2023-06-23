import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages, generalMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  companiesFormMessages,
  targetFormsGeneralMessages
} from 'views/Technique/messages'

interface FormValues extends AddressFormValues {
  name: string
  sector: string
  comments?: string
}

const CompaniesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')

  const sector = [
    {
      value: 'agriculture',
      text: formatMessage(companiesFormMessages.agriculture)
    },
    { value: 'commerce', text: formatMessage(companiesFormMessages.commerce) },
    {
      value: 'construction',
      text: formatMessage(companiesFormMessages.construction)
    },
    {
      value: 'education',
      text: formatMessage(companiesFormMessages.education)
    },
    { value: 'finance', text: formatMessage(companiesFormMessages.finance) },
    {
      value: 'manufacturing',
      text: formatMessage(companiesFormMessages.manufacturing)
    },
    { value: 'health', text: formatMessage(companiesFormMessages.health) },
    { value: 'services', text: formatMessage(companiesFormMessages.services) },
    {
      value: 'technology',
      text: formatMessage(companiesFormMessages.technology)
    },
    {
      value: 'transportation',
      text: formatMessage(companiesFormMessages.transportation)
    },
    { value: 'other', text: formatMessage(generalMessages.other) }
  ]
  const fields: Array<Field<FormValues & AddressFormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        labelSpacing: '1',
        id: 'company-name',
        label: formatMessage(companiesFormMessages.companyName),
        placeholder: formatMessage(companiesFormMessages.companyNamePlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'select',
      name: 'sector',
      options: {
        clearable: false,
        label: formatMessage(companiesFormMessages.sector),
        placeholder: formatMessage(companiesFormMessages.sectorPlaceholder),
        items: sector,
        textField: 'text',
        valueField: 'value',
        portal: true
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'other_sector',
      options: {
        labelSpacing: '1',
        id: 'other-sector',
        label: formatMessage(companiesFormMessages.otherSector),
        placeholder: formatMessage(companiesFormMessages.otherSectorPlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 },
      renderIf: {
        sector: 'other'
      }
    },
    ...addressFields,
    {
      type: 'text',
      name: 'comments',
      section: 'comments',
      options: {
        labelSpacing: '1',
        id: 'company-comments',
        label: formatMessage(targetFormsGeneralMessages.comments),
        placeholder: formatMessage(
          targetFormsGeneralMessages.commentsPlaceholder
        ),
        multiline: true,
        rows: 4
      },
      breakpoints: { xs: 12 }
    }
  ]

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(companiesFormMessages.companyAddress),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 2
    },
    {
      name: 'comments'
    }
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      sector: yup.string().required(formatMessage(formMessages.required)),
      other_sector: yup
        .string()
        .when('sector', (value, field) =>
          value === 'other'
            ? yup.string().required(formatMessage(formMessages.required))
            : field
        )
    })
    .concat(addressValidationSchema)

  return (
    <div>
      <AccordionForm<FormValues & AddressFormValues>
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
