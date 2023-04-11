import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import {
  objectiveFormsGeneralMessages,
  vehiclesFormMessages
} from 'views/Techniques/messages'

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
        label: formatMessage(vehiclesFormMessages.brand),
        placeholder: formatMessage(vehiclesFormMessages.brandPlaceholder)
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'model',
      options: {
        id: 'vehicle-model',
        label: formatMessage(vehiclesFormMessages.model),
        placeholder: formatMessage(vehiclesFormMessages.modelPlaceholder)
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'year',
      options: {
        id: 'vehicle-year',
        label: formatMessage(vehiclesFormMessages.year),
        placeholder: formatMessage(vehiclesFormMessages.yearPlaceholder)
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'select',
      name: 'vehicleType',
      options: {
        label: formatMessage(vehiclesFormMessages.vehicleType),
        clearable: true,
        placeholder: formatMessage(vehiclesFormMessages.vehicleTypePlaceholder),
        items: [
          {
            id: '1',
            label: formatMessage(vehiclesFormMessages.sport)
          },
          {
            id: '2',
            label: formatMessage(vehiclesFormMessages.sedan)
          },
          {
            id: '3',
            label: formatMessage(vehiclesFormMessages.motorcycle)
          },
          {
            id: '4',
            label: formatMessage(vehiclesFormMessages.pickup)
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
        label: formatMessage(vehiclesFormMessages.plates),
        placeholder: formatMessage(vehiclesFormMessages.platesPlaceholder)
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'comments',
      options: {
        id: 'vehicle-comments',
        label: formatMessage(objectiveFormsGeneralMessages.comments),
        placeholder: formatMessage(
          objectiveFormsGeneralMessages.commentsPlaceholder
        ),
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
        title={formatMessage(vehiclesFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(vehiclesFormMessages.itemTitle)}
      />
    </div>
  )
}

export default VehiclesForm
