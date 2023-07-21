import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages, generalMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  propertiesFormMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import { TechniqueTabs } from 'types/technique'
import useToast from 'hooks/useToast'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'

interface FormValues extends AddressFormValues {
  id?: string
  type: string
  other_type?: string
}

const PropertiesForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'properties')
  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)
  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')

  const types = [
    { value: 'house', text: formatMessage(propertiesFormMessages.house) },
    {
      value: 'apartment',
      text: formatMessage(propertiesFormMessages.apartment)
    },
    { value: 'office', text: formatMessage(propertiesFormMessages.office) },
    { value: 'retail', text: formatMessage(propertiesFormMessages.retail) },
    {
      value: 'condominium',
      text: formatMessage(propertiesFormMessages.condominium)
    },
    { value: 'building', text: formatMessage(propertiesFormMessages.building) },
    { value: 'land', text: formatMessage(propertiesFormMessages.land) },
    { value: 'other', text: formatMessage(generalMessages.other) }
  ]

  const fields: Array<Field<FormValues>> = [
    {
      type: 'select',
      name: 'type',
      options: {
        clearable: false,
        label: formatMessage(propertiesFormMessages.type),
        placeholder: formatMessage(propertiesFormMessages.typePlaceholder),
        items: types,
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
        id: 'other-type',
        label: formatMessage(propertiesFormMessages.otherType),
        placeholder: formatMessage(propertiesFormMessages.otherTypePlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 },
      renderIf: {
        type: 'other'
      }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      type: yup.string().required(formatMessage(formMessages.required)),
      other_type: yup
        .string()
        .when('type', (value, field) =>
          value === 'other'
            ? yup.string().required(formatMessage(formMessages.required))
            : field
        )
    })
    .concat(addressValidationSchema)

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(propertiesFormMessages.propertyAddress),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 2
    }
  ]

  const setItems = (items: any[]): void => {
    setInitialData(
      items.map((item) => ({
        id: item.id,
        type: item.type ?? '',
        other_type: item.other_type ?? '',
        activity: item.activity ?? '',
        country: item.address?.country ?? '',
        state: item.address?.state ?? '',
        city: item.address?.city ?? '',
        zipCode: item.address?.zip ?? '',
        line1: item.address?.address_line_1 ?? '',
        line2: item.address?.address_line_2 ?? ''
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
          type: form.type,
          other_type: form.type === 'other' ? form.other_type : undefined,
          address: {
            country: form.country,
            state: form.state,
            city: form.city,
            zip: form.zipCode,
            address_line_1: form.line1,
            address_line_2: form.line2
          }
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
    getData()
  }, [target?.id])

  return (
    <div>
      <DeleteFormConfirmation onAction={deleteFormConfirm} />
      <AccordionForm<FormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(propertiesFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(propertiesFormMessages.itemTitle)}
        withSections={{ renderMainSection: true, sections }}
        initialData={initialData}
        onSubmit={updateData}
        onDelete={deleteData}
      />
    </div>
  )
}

export default PropertiesForm
