import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages, generalMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import {
  targetFormsGeneralMessages,
  targetMetaFormMessages,
  vehiclesFormMessages
} from 'views/Technique/messages'
import { TechniqueTabs } from 'types/technique'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import { useTechnique } from 'context/Technique'
import useToast from 'hooks/useToast'
import useTargetMeta from 'hooks/useTargetMeta'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

interface FormValues {
  id?: string
  brand: string
  other_brand?: string
  model: string
  year: string
  type: string
  other_type: string
  color: string
  other_color?: string
  plates: string
  comments?: string
}

const VehiclesForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'vehicles')
  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)
  const ability = useAbility()

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

  const vehicleColor = [
    { value: 'silver', text: formatMessage(vehiclesFormMessages.silver) },
    { value: 'black', text: formatMessage(vehiclesFormMessages.black) },
    { value: 'white', text: formatMessage(vehiclesFormMessages.white) },
    { value: 'gray', text: formatMessage(vehiclesFormMessages.gray) },
    { value: 'red', text: formatMessage(vehiclesFormMessages.red) },
    { value: 'blue', text: formatMessage(vehiclesFormMessages.blue) },
    { value: 'green', text: formatMessage(vehiclesFormMessages.green) },
    { value: 'brown', text: formatMessage(vehiclesFormMessages.brown) },
    { value: 'yellow', text: formatMessage(vehiclesFormMessages.yellow) },
    { value: 'orange', text: formatMessage(vehiclesFormMessages.orange) },
    { value: 'purple', text: formatMessage(vehiclesFormMessages.purple) },
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
        portal: true,
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
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
        placeholder: formatMessage(vehiclesFormMessages.otherBrandPlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
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
        labelSpacing: '1',
        id: 'vehicle-model',
        label: formatMessage(vehiclesFormMessages.model),
        placeholder: formatMessage(vehiclesFormMessages.modelPlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'year',
      options: {
        labelSpacing: '1',
        id: 'vehicle-year',
        label: formatMessage(vehiclesFormMessages.year),
        placeholder: formatMessage(vehiclesFormMessages.yearPlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'select',
      name: 'type',
      options: {
        label: formatMessage(vehiclesFormMessages.vehicleType),
        placeholder: formatMessage(vehiclesFormMessages.vehicleTypePlaceholder),
        clearable: false,
        items: vehicleType,
        textField: 'text',
        valueField: 'value',
        portal: true,
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'other_type',
      options: {
        labelSpacing: '1',
        id: 'other-type',
        label: formatMessage(vehiclesFormMessages.otherType),
        placeholder: formatMessage(vehiclesFormMessages.otherTypePlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 },
      renderIf: {
        type: 'other'
      }
    },
    {
      type: 'select',
      name: 'color',
      options: {
        label: formatMessage(vehiclesFormMessages.color),
        placeholder: formatMessage(vehiclesFormMessages.colorPlaceholder),
        clearable: false,
        items: vehicleColor,
        textField: 'text',
        valueField: 'value',
        portal: true,
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'other_color',
      options: {
        labelSpacing: '1',
        id: 'other-color',
        label: formatMessage(vehiclesFormMessages.otherColor),
        placeholder: formatMessage(vehiclesFormMessages.otherColorPlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 },
      renderIf: {
        color: 'other'
      }
    },
    {
      type: 'text',
      name: 'plates',
      options: {
        id: 'vehicle-plates',
        labelSpacing: '1',
        label: formatMessage(vehiclesFormMessages.plates),
        placeholder: formatMessage(vehiclesFormMessages.platesPlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'comments',
      options: {
        labelSpacing: '1',
        id: 'vehicle-comments',
        label: formatMessage(targetFormsGeneralMessages.comments),
        placeholder: formatMessage(
          targetFormsGeneralMessages.commentsPlaceholder
        ),
        multiline: true,
        rows: 4,
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
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

  const setItems = (items: any[]): void => {
    setInitialData(
      items.map((item) => ({
        id: item.id,
        brand: item.brand,
        other_brand: item.other_brand,
        model: item.model,
        year: item.year,
        type: item.type,
        other_type: item.other_type,
        color: item.color,
        other_color: item.other_color,
        plates: item.plates,
        comments: item.comments
      }))
    )
  }

  const getData = async (): Promise<void> => {
    try {
      const response = await actions.get()

      setItems(response.data)
    } catch {
      techniqueActions?.setActiveTab(TechniqueTabs.GENERAL_DATA)
    }
  }

  const updateData = async (values: FormValues[]): Promise<void> => {
    try {
      const response = await actions.update(
        values.map((form) => ({
          id: form.id,
          brand: form.brand,
          other_brand: form.brand === 'other' ? form.other_brand : undefined,
          model: form.model,
          year: form.year,
          type: form.type,
          other_type: form.type === 'other' ? form.other_type : undefined,
          color: form.color,
          other_color: form.color === 'other' ? form.other_color : undefined,
          plates: form.plates,
          comments: form.comments ? form.comments : undefined
        }))
      )

      setItems(response.data)

      launchToast({
        title: formatMessage(targetMetaFormMessages.updatedSuccessfully),
        type: 'Success'
      })
    } catch {}
  }

  const deleteData = async (id: string): Promise<boolean> => {
    try {
      const deleteOnDB = await new Promise<boolean>((resolve) =>
        setDeleteFormConfirm(() => resolve)
      )

      setDeleteFormConfirm(null)

      if (!deleteOnDB) return false

      await actions.delete(id)

      return true
    } catch {
      return false
    }
  }

  useEffect(() => {
    if (!target?.id) getData()
  }, [target?.id])

  return (
    <div>
      <DeleteFormConfirmation onAction={deleteFormConfirm} />
      <AccordionForm<FormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(vehiclesFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(vehiclesFormMessages.itemTitle)}
        initialData={initialData}
        onSubmit={updateData}
        onDelete={deleteData}
      />
    </div>
  )
}

export default VehiclesForm
