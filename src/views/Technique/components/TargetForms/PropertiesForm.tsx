import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages, generalMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import { propertiesFormMessages } from 'views/Technique/messages'

interface FormValues extends AddressFormValues {
  type: string
}

const PropertiesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')

  const types = [
    { value: 'house', text: formatMessage(propertiesFormMessages.house) },
    {
      value: 'apartment',
      text: formatMessage(propertiesFormMessages.apartment)
    },
    { value: 'office', text: formatMessage(propertiesFormMessages.office) },
    { value: 'retail', text: formatMessage(propertiesFormMessages.retail) },
    {
      value: 'condominium',
      text: formatMessage(propertiesFormMessages.condominium)
    },
    { value: 'building', text: formatMessage(propertiesFormMessages.building) },
    { value: 'land', text: formatMessage(propertiesFormMessages.land) },
    { value: 'other', text: formatMessage(generalMessages.other) }
  ]

  const fields: Array<Field<FormValues & AddressFormValues>> = [
    {
      type: 'select',
      name: 'type',
      options: {
        clearable: false,
        label: formatMessage(propertiesFormMessages.type),
        placeholder: formatMessage(propertiesFormMessages.typePlaceholder),
        items: types,
        textField: 'text',
        valueField: 'value',
        portal: true
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'other_type',
      options: {
        labelSpacing: '1',
        id: 'other-type',
        label: formatMessage(propertiesFormMessages.otherType),
        placeholder: formatMessage(propertiesFormMessages.otherTypePlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 },
      renderIf: {
        type: 'other'
      }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      type: yup.string().required(formatMessage(formMessages.required)),
      other_type: yup
        .string()
        .when('type', (value, field) =>
          value === 'other'
            ? yup.string().required(formatMessage(formMessages.required))
            : field
        )
    })
    .concat(addressValidationSchema)

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(propertiesFormMessages.propertyAddress),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 2
    }
  ]

  return (
    <div>
      <AccordionForm<FormValues & AddressFormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(propertiesFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(propertiesFormMessages.itemTitle)}
        withSections={{
          renderMainSection: true,
          sections
        }}
      />
    </div>
  )
}

export default PropertiesForm
