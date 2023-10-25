import { ReactElement, useEffect, useState } from 'react'
import { AddressFormValues, useAddressForm } from './useAddressForm'
import { useIntl } from 'react-intl'
import { Field, Section } from 'types/form'
import {
  socialCircleFormMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import * as yup from 'yup'
import { formMessages } from 'globalMessages'
import AccordionForm from './AccordionForm'
import useToast from 'hooks/useToast'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import { TechniqueTabs } from 'types/technique'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import { simpleText } from 'utils/patterns'

interface FormValues extends AddressFormValues {
  id?: string
  name: string
  activity: string
}

const SocialCircleForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'socials')
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
        label: formatMessage(socialCircleFormMessages.name),
        placeholder: formatMessage(socialCircleFormMessages.namePlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: {
        xs: 12,
        md: 6
      }
    },
    {
      type: 'text',
      name: 'activity',
      options: {
        label: formatMessage(socialCircleFormMessages.activity),
        placeholder: formatMessage(
          socialCircleFormMessages.activityPlaceholder
        ),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: {
        xs: 12,
        md: 6
      }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup
        .string()
        .required(formatMessage(formMessages.required))
        .matches(simpleText, formatMessage(formMessages.invalidSimpleText)),
      activity: yup
        .string()
        .required(formatMessage(formMessages.required))
        .matches(simpleText, formatMessage(formMessages.invalidSimpleText))
    })
    .concat(addressValidationSchema)

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(socialCircleFormMessages.address),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 2
    }
  ]

  const getData = async (): Promise<void> => {
    try {
      const response = await actions.get()
      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          name: item.name ?? '',
          activity: item.activity ?? '',
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
    if (!target?.id) getData()
  }, [target?.id])

  return (
    <div>
      <DeleteFormConfirmation onAction={deleteFormConfirm} />
      <AccordionForm
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(socialCircleFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(socialCircleFormMessages.itemTitle)}
        withSections={{ renderMainSection: true, sections }}
        initialData={initialData}
        onSubmit={updateData}
        onDelete={deleteData}
      />
    </div>
  )
}

export default SocialCircleForm
