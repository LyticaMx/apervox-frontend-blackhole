import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import { propertiesFormMessages } from 'views/Techniques/messages'

interface FormValues extends AddressFormValues {
  type: string
}

const PropertiesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const { addressFields, addressValidationSchema } = useAddressForm('address')

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'select',
      name: 'type',
      options: {
        label: formatMessage(propertiesFormMessages.type),
        clearable: true,
        placeholder: formatMessage(propertiesFormMessages.typePlaceholder),
        items: [
          {
            id: '1',
            label: formatMessage(propertiesFormMessages.apartment)
          },
          {
            id: '2',
            label: formatMessage(propertiesFormMessages.house)
          },
          {
            id: '3',
            label: formatMessage(propertiesFormMessages.office)
          }
        ],
        textField: 'label',
        valueField: 'id',
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: 'w-[95%]'
      },
      breakpoints: { xs: 12, md: 3 }
    },

    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(propertiesFormMessages.propertyAddress),
        className: 'text-primary uppercase mt-2'
      }
    }
  ]

  return (
    <div>
      <AccordionForm<FormValues | AddressFormValues>
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
