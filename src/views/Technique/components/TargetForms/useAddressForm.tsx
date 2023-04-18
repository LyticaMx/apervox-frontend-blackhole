import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import { useAddressMessages } from 'views/Techniques/messages'

export interface AddressFormValues {
  state: string
  municipality: string
  postalCode: string
  colony: string
  street: string
  number: string
}

interface AddressForm {
  addressFields: Array<Field<AddressFormValues>>
  addressValidationSchema: any
}

export const useAddressForm = (section?: string): AddressForm => {
  const { formatMessage } = useIntl()

  const addressFields: Array<Field<AddressFormValues>> = [
    {
      type: 'select',
      name: 'state',
      options: {
        label: formatMessage(useAddressMessages.state),
        clearable: true,
        placeholder: formatMessage(useAddressMessages.statePlaceholder),
        items: [
          {
            id: '1',
            label: 'Estado de México'
          },
          {
            id: '2',
            label: 'CDMX'
          },
          {
            id: '3',
            label: 'Quintana Roo'
          }
        ],
        textField: 'label',
        valueField: 'id',
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: 'w-[95%]'
      },
      breakpoints: { xs: 12, md: 3 },
      section
    },
    {
      type: 'select',
      name: 'municipality',
      options: {
        label: formatMessage(useAddressMessages.municipality),
        clearable: true,
        placeholder: formatMessage(useAddressMessages.municipalityPlaceholder),
        items: [
          {
            id: '1',
            label: 'Atizepán de Zaragoza'
          },
          {
            id: '2',
            label: 'Iztapalapa'
          },
          {
            id: '3',
            label: 'Chimalhuacán'
          },
          {
            id: '4',
            label: 'Benito Juarez'
          },
          {
            id: '5',
            label: 'Nezahualcoyotl'
          }
        ],
        textField: 'label',
        valueField: 'id',
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: 'w-[95%]'
      },
      breakpoints: { xs: 12, md: 3 },
      section
    },
    {
      type: 'text',
      name: 'postalCode',
      options: {
        id: 'company-postalCode',
        label: formatMessage(useAddressMessages.zipCode),
        placeholder: formatMessage(useAddressMessages.zipCodePlaceholder)
      },
      breakpoints: { xs: 12, md: 3 },
      section
    },
    {
      type: 'text',
      name: 'colony',
      options: {
        id: 'company-colony',
        label: formatMessage(useAddressMessages.colony),
        placeholder: formatMessage(useAddressMessages.colonyPlaceholder)
      },
      breakpoints: { xs: 12, md: 3 },
      section
    },
    {
      type: 'text',
      name: 'street',
      options: {
        id: 'company-street',
        label: formatMessage(useAddressMessages.street),
        placeholder: formatMessage(useAddressMessages.streetPlaceholder)
      },
      breakpoints: { xs: 12, md: 3 },
      section
    },
    {
      type: 'text',
      name: 'number',
      options: {
        id: 'company-number',
        label: formatMessage(useAddressMessages.number),
        placeholder: formatMessage(useAddressMessages.numberPlaceholder)
      },
      breakpoints: { xs: 12, md: 3 },
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
