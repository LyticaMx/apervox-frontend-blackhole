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

const ScheduleForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const { addressFields, addressValidationSchema } = useAddressForm()

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'contactName',
      options: {
        id: 'contact-name',
        label: 'Nombre del contacto',
        placeholder: 'Ej. El chapo'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'contactPhoneNumber',
      options: {
        id: 'contact-number',
        label: 'Número teléfonico',
        placeholder: 'Ej. numero a 10 dígitos'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'custom',
      name: 'addressTitle',
      children: (
        <Typography variant="body1" className="text-primary uppercase mt-2">
          Domicilio del contacto
        </Typography>
      ),
      breakpoints: { xs: 12 }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      contactName: yup.string().required(formatMessage(formMessages.required)),
      contactPhoneNumber: yup
        .string()
        .required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  return (
    <div>
      <AccordionForm<FormValues | AddressFormValues>
        fields={fields}
        validationSchema={validationSchema}
        title="DATOS DE AGENDA"
        itemTitle="Contacto"
      />
    </div>
  )
}

export default ScheduleForm
