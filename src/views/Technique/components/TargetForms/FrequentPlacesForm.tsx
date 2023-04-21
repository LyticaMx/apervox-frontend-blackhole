import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import { frequentPlacesFormMessages } from 'views/Technique/messages'

interface FormValues extends AddressFormValues {
  name: string
  phone: string
}

const FrequentPlacesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const { addressFields, addressValidationSchema } = useAddressForm('address')

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'placeName',
      options: {
        id: 'place-name',
        label: formatMessage(frequentPlacesFormMessages.placeName),
        placeholder: formatMessage(
          frequentPlacesFormMessages.placeNamePlaceholder
        )
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'placeActivity',
      options: {
        id: 'place-activity',
        label: formatMessage(frequentPlacesFormMessages.placeActivity),
        placeholder: formatMessage(
          frequentPlacesFormMessages.placeActivityPlaceholder
        )
      },
      breakpoints: { xs: 6 }
    },
    ...addressFields
  ]

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(frequentPlacesFormMessages.placeAddress),
        className: 'text-primary uppercase mt-2'
      }
    }
  ]

  const validationSchema = yup
    .object({
      placeName: yup.string().required(formatMessage(formMessages.required)),
      placeActivity: yup.string().required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  return (
    <div>
      <AccordionForm<FormValues | AddressFormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(frequentPlacesFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(frequentPlacesFormMessages.itemTitle)}
        withSections={{
          renderMainSection: true,
          sections
        }}
      />
    </div>
  )
}

export default FrequentPlacesForm
