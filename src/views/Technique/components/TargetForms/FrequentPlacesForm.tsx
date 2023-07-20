import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  frequentPlacesFormMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'
import useToast from 'hooks/useToast'
import { TechniqueTabs } from 'types/technique'
import DeleteFormConfirmation from './DeleteFormConfirmation'

interface FormValues extends AddressFormValues {
  id?: string
  name: string
  activity: string
  frequency: string
}

const FrequentPlacesForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'places')
  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)

  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')

  const frequency = [
    {
      text: formatMessage(frequentPlacesFormMessages.daily),
      value: 'daily'
    },
    {
      text: formatMessage(frequentPlacesFormMessages.almostDaily),
      value: 'almost_daily'
    },
    {
      text: formatMessage(frequentPlacesFormMessages.twiceWeekly),
      value: 'twice_weekly'
    },
    {
      text: formatMessage(frequentPlacesFormMessages.weekly),
      value: 'weekly'
    },
    {
      text: formatMessage(frequentPlacesFormMessages.biweekly),
      value: 'biweekly'
    },
    {
      text: formatMessage(frequentPlacesFormMessages.monthly),
      value: 'monthly'
    }
  ]

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        labelSpacing: '1',
        id: 'place-name',
        label: formatMessage(frequentPlacesFormMessages.placeName),
        placeholder: formatMessage(
          frequentPlacesFormMessages.placeNamePlaceholder
        )
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'activity',
      options: {
        labelSpacing: '1',
        id: 'place-activity',
        label: formatMessage(frequentPlacesFormMessages.placeActivity),
        placeholder: formatMessage(
          frequentPlacesFormMessages.placeActivityPlaceholder
        )
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'select',
      name: 'frequency',
      options: {
        label: formatMessage(frequentPlacesFormMessages.frequency),
        clearable: false,
        placeholder: formatMessage(
          frequentPlacesFormMessages.frequencyPlaceholder
        ),
        items: frequency,
        textField: 'text',
        valueField: 'value',
        portal: true
      },
      breakpoints: { xs: 12, md: 6 }
    },
    ...addressFields
  ]

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(frequentPlacesFormMessages.placeAddress),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 2
    }
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      activity: yup.string().required(formatMessage(formMessages.required)),
      frequency: yup.string().required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  const getData = async (): Promise<void> => {
    try {
      const response = await actions.get()
      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          name: item.name ?? '',
          activity: item.activity ?? '',
          frequency: item.frequency ?? '',
          country: item.address?.country ?? '',
          state: item.address?.state ?? '',
          city: item.address?.city ?? '',
          zipCode: item.address?.zip ?? '',
          line1: item.address?.address_line_1 ?? '',
          line2: item.address?.address_line_2 ?? ''
        }))
      )
    } catch {
      techniqueActions?.setActiveTab(TechniqueTabs.GENERAL_DATA)
    }
  }

  const updateData = async (values: FormValues[]): Promise<void> => {
    try {
      const response = await actions.update(
        values.map((form) => ({
          id: form.id,
          name: form.name,
          activity: form.activity,
          frequency: form.frequency,
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

      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          name: item.name ?? '',
          activity: item.activity ?? '',
          frequency: item.frequency ?? '',
          country: item.address?.country ?? '',
          state: item.address?.state ?? '',
          city: item.address?.city ?? '',
          zipCode: item.address?.zip ?? '',
          line1: item.address?.address_line_1 ?? '',
          line2: item.address?.address_line_2 ?? ''
        }))
      )

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
        title={formatMessage(frequentPlacesFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(frequentPlacesFormMessages.itemTitle)}
        withSections={{ renderMainSection: true, sections }}
        initialData={initialData}
        onSubmit={updateData}
        onDelete={deleteData}
      />
    </div>
  )
}

export default FrequentPlacesForm
