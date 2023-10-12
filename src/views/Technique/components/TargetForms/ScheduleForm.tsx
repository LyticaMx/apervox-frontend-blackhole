import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  targetFormsGeneralMessages,
  scheduleFormMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import useToast from 'hooks/useToast'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'
import { TechniqueTabs } from 'types/technique'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

interface FormValues extends AddressFormValues {
  id?: string
  name: string
  phone: string
}

const ScheduleForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'contacts')
  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)
  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')
  const ability = useAbility()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        labelSpacing: '1',
        id: 'contact-name',
        label: formatMessage(scheduleFormMessages.name),
        placeholder: formatMessage(scheduleFormMessages.namePlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        labelSpacing: '1',
        id: 'contact-phone',
        label: formatMessage(targetFormsGeneralMessages.phone),
        placeholder: formatMessage(targetFormsGeneralMessages.phonePlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 }
    },

    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      phone: yup.string().required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(scheduleFormMessages.address),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 2
    }
  ]

  const setItems = (items: any[]): void => {
    setInitialData(
      items.map((item) => ({
        id: item.id,
        name: item.name ?? '',
        phone: item.phone ?? '',
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
          name: form.name,
          phone: form.phone,
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
    if (!target?.id) return
    getData()
  }, [target?.id])

  return (
    <div>
      <DeleteFormConfirmation onAction={deleteFormConfirm} />
      <AccordionForm<FormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(scheduleFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(scheduleFormMessages.itemTitle)}
        withSections={{
          renderMainSection: true,
          sections
        }}
        initialData={initialData}
        onSubmit={updateData}
        onDelete={deleteData}
      />
    </div>
  )
}

export default ScheduleForm
