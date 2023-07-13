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

interface AddressForm<T extends any> {
  addressFields: Array<Field<AddressFormValues & T>>
  addressValidationSchema: any
}

export const useAddressForm = <T,>(section?: string): AddressForm<T> => {
  const { formatMessage } = useIntl()

  const addressFields: Array<Field<AddressFormValues & T>> = [
    {
      type: 'city-selector',
      name: 'city-selector',
      options: {
        countryName: 'country',
        stateName: 'state',
        cityName: 'city',
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
        placeholder: formatMessage(useAddressMessages.zipCodePlaceholder),
        labelSpacing: '1'
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
        placeholder: formatMessage(useAddressMessages.line1Placeholder),
        labelSpacing: '1'
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
        placeholder: formatMessage(useAddressMessages.line2Placeholder),
        labelSpacing: '1'
      },
      breakpoints: { xs: 12 },
      section
    }
  ]

  const addressValidationSchema = yup.object({
    country: yup.string().required(formatMessage(formMessages.required)),
    state: yup.string().required(formatMessage(formMessages.required)),
    city: yup.string().required(formatMessage(formMessages.required)),
    zipCode: yup.string().required(formatMessage(formMessages.required)),
    line1: yup.string().required(formatMessage(formMessages.required))
  })

  return {
    addressFields,
    addressValidationSchema
  }
}
