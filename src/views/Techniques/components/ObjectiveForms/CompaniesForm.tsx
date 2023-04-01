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
  comments?: string
}

const CompaniesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const { addressFields, addressValidationSchema } = useAddressForm()

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'company-name',
        label: 'Nombre o razon social',
        placeholder: 'Ej. Empresa Audi'
      },
      breakpoints: { xs: 12, md: 4 }
    },
    {
      type: 'custom',
      name: 'addressTitle',
      children: (
        <Typography variant="body1" className="text-primary uppercase mt-2">
          Domicilio de la empresa
        </Typography>
      ),
      breakpoints: { xs: 12 }
    },
    ...addressFields,
    {
      type: 'text',
      name: 'comments',
      options: {
        id: 'company-comments',
        label: 'Comentarios',
        placeholder: 'Escribe algun comentario aquí',
        multiline: true,
        rows: 4
      },
      breakpoints: { xs: 12, md: 6 }
    }
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  return (
    <div>
      <AccordionForm<FormValues | AddressFormValues>
        fields={fields}
        validationSchema={validationSchema}
        title="Empresas"
        itemTitle="Empresa"
      />
    </div>
  )
}

export default CompaniesForm
