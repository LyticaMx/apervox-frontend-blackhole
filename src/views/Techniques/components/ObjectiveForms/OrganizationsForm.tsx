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
  email: string
}

const OrganizationsForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { addressFields, addressValidationSchema } = useAddressForm()

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'organization-name',
        label: 'Nombre de la organización',
        placeholder: 'Ej. Organización XXXX'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        id: 'organization-email',
        label: 'Correo electrónico',
        placeholder: 'Ej. correo@dominio.com'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'organization-phone',
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
          Domicilio de la organización
        </Typography>
      ),
      breakpoints: { xs: 12 }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      email: yup
        .string()
        .trim()
        .email(formatMessage(formMessages.invalidEmail))
        .required(formatMessage(formMessages.required)),
      phone: yup.string().required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  return (
    <div>
      <AccordionForm<FormValues | AddressFormValues>
        fields={fields}
        validationSchema={validationSchema}
        title="ORGANIZACIONES"
        itemTitle="Organización"
      />
    </div>
  )
}

export default OrganizationsForm
