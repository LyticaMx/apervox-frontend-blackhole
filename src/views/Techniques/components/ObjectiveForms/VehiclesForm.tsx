import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'

interface FormValues {
  brand: string
  model: string
  year: string
  type: string
  plates: string
  comments?: string
}

const VehiclesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'brand',
      options: {
        id: 'vehicle-brand',
        label: 'Marca del vehículo',
        placeholder: 'Ej. Chevrolet'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'model',
      options: {
        id: 'vehicle-model',
        label: 'Modelo',
        placeholder: 'Ej. Corvette'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'year',
      options: {
        id: 'vehicle-year',
        label: 'Año',
        placeholder: 'Ej. 2023'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'select',
      name: 'vehicleType',
      options: {
        label: 'Tipo de vehículo',
        clearable: true,
        placeholder: 'Ej. Deportivo',
        items: [
          {
            id: '1',
            label: 'Deportivo'
          },
          {
            id: '2',
            label: 'Sedan'
          },
          {
            id: '3',
            label: 'Motocicleta'
          },
          {
            id: '4',
            label: 'Pickup'
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
      name: 'plates',
      options: {
        id: 'vehicle-plates',
        label: 'Placas',
        placeholder: 'Ej. XA12BC'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'comments',
      options: {
        id: 'vehicle-comments',
        label: 'Comentarios',
        placeholder: 'Escribe algun comentario aquí',
        multiline: true,
        rows: 4
      },
      breakpoints: { xs: 12, md: 6 }
    }
  ]

  const validationSchema = yup.object({
    brand: yup.string().required(formatMessage(formMessages.required)),
    model: yup.string().required(formatMessage(formMessages.required)),
    year: yup.string().required(formatMessage(formMessages.required)),
    type: yup.string().required(formatMessage(formMessages.required)),
    plates: yup.string().required(formatMessage(formMessages.required))
  })

  return (
    <div>
      <AccordionForm<FormValues>
        fields={fields}
        validationSchema={validationSchema}
        title="VEHÍCULOS"
        itemTitle="Vehículo"
      />
    </div>
  )
}

export default VehiclesForm
