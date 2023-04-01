import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'

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

export const useAddressForm = (): AddressForm => {
  const { formatMessage } = useIntl()

  const addressFields: Array<Field<AddressFormValues>> = [
    {
      type: 'select',
      name: 'state',
      options: {
        label: 'Estado',
        clearable: true,
        placeholder: 'Ej. CDMX',
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
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'select',
      name: 'municipality',
      options: {
        label: 'Municipio / Alcaldía',
        clearable: true,
        placeholder: 'Ej. Iztapalapa',
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
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'postalCode',
      options: {
        id: 'company-postalCode',
        label: 'Código Postal',
        placeholder: 'Ej. 12345'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'colony',
      options: {
        id: 'company-colony',
        label: 'Colonia',
        placeholder: 'Ej. Héroes de Tec'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'street',
      options: {
        id: 'company-street',
        label: 'Nombre de la calle',
        placeholder: 'Ej. Av. Ejercito nacional'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'number',
      options: {
        id: 'company-number',
        label: 'Número exterior',
        placeholder: 'Ej. Edificio 1-A 564'
      },
      breakpoints: { xs: 12, md: 3 }
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
