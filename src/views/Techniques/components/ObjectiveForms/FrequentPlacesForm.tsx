import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import Typography from 'components/Typography'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'

interface FormValues extends AddressFormValues {
  name: string
  phone: string
}

const FrequentPlacesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const { addressFields, addressValidationSchema } = useAddressForm()

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'placeName',
      options: {
        id: 'place-name',
        label: 'Nombre del sitio que visita',
        placeholder: 'Ej. Lugar AAAA'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'placeActivity',
      options: {
        id: 'place-activity',
        label: 'Actividad que realiza',
        placeholder: 'Ej. correr'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'custom',
      name: 'addressTitle',
      children: (
        <Typography variant="body1" className="text-primary uppercase mt-2">
          Domicilio del lugar
        </Typography>
      ),
      breakpoints: { xs: 12 }
    },
    ...addressFields
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
        title="LUGARES FRECUENTES"
        itemTitle="Lugar"
      />
    </div>
  )
}

export default FrequentPlacesForm
