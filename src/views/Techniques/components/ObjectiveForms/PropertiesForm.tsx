import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import Typography from 'components/Typography'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'

interface FormValues extends AddressFormValues {
  type: string
}

const PropertiesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const { addressFields, addressValidationSchema } = useAddressForm()

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'select',
      name: 'type',
      options: {
        label: 'Tipo de inmueble',
        clearable: true,
        placeholder: 'Ej. Departamento',
        items: [
          {
            id: '1',
            label: 'Departamento'
          },
          {
            id: '2',
            label: 'Casa'
          },
          {
            id: '3',
            label: 'Oficina'
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
      type: 'custom',
      name: 'addressTitle',
      children: (
        <Typography variant="body1" className="text-primary uppercase mt-2">
          Domicilio de la propiedad
        </Typography>
      ),
      breakpoints: { xs: 12 }
    },
    ...addressFields
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
        title="Propiedades"
        itemTitle="Propiedad"
      />
    </div>
  )
}

export default PropertiesForm
