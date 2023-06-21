import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import { useAddressMessages } from 'views/Technique/messages'

export interface AddressFormValues {
  country: string
  state: string
  city: string
  zipCode: string
  line1: string
  line2: string
}

interface AddressForm {
  addressFields: Array<Field<AddressFormValues>>
  addressValidationSchema: any
}

export const useAddressForm = (section?: string): AddressForm => {
  const { formatMessage } = useIntl()

  const addressFields: Array<Field<AddressFormValues>> = [
    {
      type: 'city-selector',
      name: 'city-selector',
      options: {
        countryLabel: formatMessage(useAddressMessages.country),
        countryPlaceholder: formatMessage(
          useAddressMessages.countryPlaceholder
        ),
        countryBreakpoints: { xs: 12, md: 6 },
        stateLabel: formatMessage(useAddressMessages.state),
        statePlaceholder: formatMessage(useAddressMessages.statePlaceholder),
        stateBreakpoints: { xs: 12, md: 6 },
        cityLabel: formatMessage(useAddressMessages.city),
        cityPlaceholder: formatMessage(useAddressMessages.cityPlaceholder),
        cityBreakpoints: { xs: 12, md: 6 },
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: '!w-full'
      },
      section
    },
    {
      type: 'text',
      name: 'zipCode',
      options: {
        id: 'zipCode',
        label: formatMessage(useAddressMessages.zipCode),
        placeholder: formatMessage(useAddressMessages.zipCodePlaceholder)
      },
      breakpoints: { xs: 12, md: 6 },
      section
    },
    {
      type: 'text',
      name: 'line1',
      options: {
        id: 'line1',
        label: formatMessage(useAddressMessages.line1),
        placeholder: formatMessage(useAddressMessages.line1Placeholder)
      },
      breakpoints: { xs: 12 },
      section
    },
    {
      type: 'text',
      name: 'line2',
      options: {
        id: 'line2',
        label: formatMessage(useAddressMessages.line2),
        placeholder: formatMessage(useAddressMessages.line2Placeholder)
      },
      breakpoints: { xs: 12 },
      section
    }
  ]

  const addressValidationSchema = yup.object({
    state: yup.string().required(formatMessage(formMessages.required)),
    municipality: yup.string().required(formatMessage(formMessages.required)),
    postalCode: yup.string().required(formatMessage(formMessages.required)),
    colony: yup.string().required(formatMessage(formMessages.required)),
    street: yup.string().required(formatMessage(formMessages.required)),
    number: yup.string().required(formatMessage(formMessages.required))
  })

  return {
    addressFields,
    addressValidationSchema
  }
}
