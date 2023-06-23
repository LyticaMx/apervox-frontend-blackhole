import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages, generalMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import {
  targetFormsGeneralMessages,
  vehiclesFormMessages
} from 'views/Technique/messages'

interface FormValues {
  brand: string
  model: string
  year: string
  type: string
  plates: string
  color: string
  comments?: string
}

const VehiclesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const carBrand = [
    { value: 'audi', text: 'Audi' },
    { value: 'bmw', text: 'BMW' },
    { value: 'chevrolet', text: 'Chevrolet' },
    { value: 'ford', text: 'Ford' },
    { value: 'gmc', text: 'GMC' },
    { value: 'honda', text: 'Honda' },
    { value: 'hyundai', text: 'Hyundai' },
    { value: 'jeep', text: 'Jeep' },
    { value: 'kia', text: 'Kia' },
    { value: 'lexus', text: 'Lexus' },
    { value: 'mazda', text: 'Mazda' },
    { value: 'mercedes', text: 'Mercedes Benz' },
    { value: 'nissan', text: 'Nissan' },
    { value: 'ram', text: 'RAM' },
    { value: 'subaru', text: 'Subaru' },
    { value: 'tesla', text: 'Tesla' },
    { value: 'toyota', text: 'Toyota' },
    { value: 'volkswagen', text: 'Volkswagen' },
    { value: 'volvo', text: 'Volvo' },
    { value: 'other', text: formatMessage(generalMessages.other) }
  ]

  const vehicleType = [
    {
      value: 'motorcycle',
      text: formatMessage(vehiclesFormMessages.motorcycle)
    },
    {
      value: 'subcompact',
      text: formatMessage(vehiclesFormMessages.subcompact)
    },
    { value: 'compact', text: formatMessage(vehiclesFormMessages.compact) },
    { value: 'coupe', text: formatMessage(vehiclesFormMessages.coupe) },
    { value: 'sedan', text: formatMessage(vehiclesFormMessages.sedan) },
    { value: 'hatchback', text: formatMessage(vehiclesFormMessages.hatchback) },
    { value: 'sport', text: formatMessage(vehiclesFormMessages.sport) },
    {
      value: 'convertible',
      text: formatMessage(vehiclesFormMessages.convertible)
    },
    { value: 'suv', text: formatMessage(vehiclesFormMessages.suv) },
    { value: 'wagon', text: formatMessage(vehiclesFormMessages.wagon) },
    { value: 'minivan', text: formatMessage(vehiclesFormMessages.minivan) },
    { value: 'van', text: formatMessage(vehiclesFormMessages.van) },
    { value: 'pickup', text: formatMessage(vehiclesFormMessages.pickup) },
    { value: 'bus', text: formatMessage(vehiclesFormMessages.bus) },
    { value: 'truck', text: formatMessage(vehiclesFormMessages.truck) },
    { value: 'trailer', text: formatMessage(vehiclesFormMessages.trailer) },
    { value: 'other', text: formatMessage(generalMessages.other) }
  ]

  const fields: Array<Field<FormValues>> = [
    {
      type: 'select',
      name: 'brand',
      options: {
        clearable: false,
        label: formatMessage(vehiclesFormMessages.brand),
        placeholder: formatMessage(vehiclesFormMessages.brandPlaceholder),
        items: carBrand,
        textField: 'text',
        valueField: 'value',
        portal: true
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'other_brand',
      options: {
        labelSpacing: '1',
        id: 'other-language',
        label: formatMessage(vehiclesFormMessages.otherBrand),
        placeholder: formatMessage(vehiclesFormMessages.otherBrandPlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 },
      renderIf: {
        brand: 'other'
      }
    },
    {
      type: 'text',
      name: 'model',
      options: {
        id: 'vehicle-model',
        label: formatMessage(vehiclesFormMessages.model),
        placeholder: formatMessage(vehiclesFormMessages.modelPlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'year',
      options: {
        id: 'vehicle-year',
        label: formatMessage(vehiclesFormMessages.year),
        placeholder: formatMessage(vehiclesFormMessages.yearPlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'select',
      name: 'type',
      options: {
        label: formatMessage(vehiclesFormMessages.vehicleType),
        clearable: false,
        placeholder: formatMessage(vehiclesFormMessages.vehicleTypePlaceholder),
        items: vehicleType,
        textField: 'text',
        valueField: 'value',
        portal: true
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'other_type',
      options: {
        labelSpacing: '1',
        id: 'other-language',
        label: formatMessage(vehiclesFormMessages.otherType),
        placeholder: formatMessage(vehiclesFormMessages.otherTypePlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 },
      renderIf: {
        type: 'other'
      }
    },
    {
      type: 'text',
      name: 'color',
      options: {
        id: 'vehicle-color',
        label: formatMessage(vehiclesFormMessages.color),
        placeholder: formatMessage(vehiclesFormMessages.colorPlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'plates',
      options: {
        id: 'vehicle-plates',
        label: formatMessage(vehiclesFormMessages.plates),
        placeholder: formatMessage(vehiclesFormMessages.platesPlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'comments',
      options: {
        id: 'vehicle-comments',
        label: formatMessage(targetFormsGeneralMessages.comments),
        placeholder: formatMessage(
          targetFormsGeneralMessages.commentsPlaceholder
        ),
        multiline: true,
        rows: 4
      },
      breakpoints: { xs: 12, md: 12 }
    }
  ]

  const validationSchema = yup.object({
    brand: yup.string().required(formatMessage(formMessages.required)),
    other_brand: yup
      .string()
      .when('brand', (brand, field) =>
        brand === 'other'
          ? yup.string().required(formatMessage(formMessages.required))
          : field
      ),
    model: yup.string().required(formatMessage(formMessages.required)),
    year: yup.string().required(formatMessage(formMessages.required)),
    type: yup.string().required(formatMessage(formMessages.required)),
    other_type: yup
      .string()
      .when('type', (type, field) =>
        type === 'other'
          ? yup.string().required(formatMessage(formMessages.required))
          : field
      ),
    plates: yup.string().required(formatMessage(formMessages.required)),
    color: yup.string().required(formatMessage(formMessages.required))
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
