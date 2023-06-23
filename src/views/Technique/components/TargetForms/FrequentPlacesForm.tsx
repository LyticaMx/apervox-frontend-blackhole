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

  const frequency = [
    {
      text: formatMessage(frequentPlacesFormMessages.daily),
      value: 'daily'
    },
    {
      text: formatMessage(frequentPlacesFormMessages.almostDaily),
      value: 'almost_daily'
    },
    {
      text: formatMessage(frequentPlacesFormMessages.twiceWeekly),
      value: 'twice_weekly'
    },
    {
      text: formatMessage(frequentPlacesFormMessages.weekly),
      value: 'weekly'
    },
    {
      text: formatMessage(frequentPlacesFormMessages.biweekly),
      value: 'biweekly'
    },
    {
      text: formatMessage(frequentPlacesFormMessages.monthly),
      value: 'monthly'
    }
  ]

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
    {
      type: 'select',
      name: 'frequency',
      options: {
        label: formatMessage(frequentPlacesFormMessages.frequency),
        clearable: false,
        placeholder: formatMessage(
          frequentPlacesFormMessages.frequencyPlaceholder
        ),
        items: frequency,
        textField: 'text',
        valueField: 'value',
        portal: true
      },
      breakpoints: { xs: 12, md: 6 }
    },
    ...addressFields
  ]

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(frequentPlacesFormMessages.placeAddress),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 2
    }
  ]

  const validationSchema = yup
    .object({
      placeName: yup.string().required(formatMessage(formMessages.required)),
      placeActivity: yup.string().required(formatMessage(formMessages.required)),
      frequency: yup.string().required(formatMessage(formMessages.required))
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
