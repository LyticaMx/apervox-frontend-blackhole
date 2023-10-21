import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  targetFormsGeneralMessages,
  organizationFormMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'
import useToast from 'hooks/useToast'
import { TechniqueTabs } from 'types/technique'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import { phoneNumber, simpleText } from 'utils/patterns'

interface FormValues extends AddressFormValues {
  id?: string
  name: string
  phone: string
  email: string
}

const OrganizationsForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')

  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)
  const toast = useToast()

  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'organizations')
  const ability = useAbility()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        labelSpacing: '1',
        id: 'organization-name',
        label: formatMessage(organizationFormMessages.organizationName),
        placeholder: formatMessage(
          organizationFormMessages.organizationNamePlaceholder
        ),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        labelSpacing: '1',
        id: 'organization-email',
        label: formatMessage(formMessages.email),
        placeholder: formatMessage(targetFormsGeneralMessages.emailPlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        labelSpacing: '1',
        id: 'organization-phone',
        label: formatMessage(targetFormsGeneralMessages.phone),
        placeholder: formatMessage(targetFormsGeneralMessages.phonePlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 3 }
    },

    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup
        .string()
        .required(formatMessage(formMessages.required))
        .matches(simpleText, formatMessage(formMessages.invalidSimpleText)),
      email: yup
        .string()
        .trim()
        .email(formatMessage(formMessages.invalidEmail))
        .required(formatMessage(formMessages.required)),
      phone: yup
        .string()
        .required(formatMessage(formMessages.required))
        .matches(phoneNumber, formatMessage(formMessages.invalidPhoneNumber))
    })
    .concat(addressValidationSchema)

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(organizationFormMessages.organizationAddress),
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
          phone: item.phone ?? '',
          email: item.email ?? '',
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
          phone: form.phone,
          email: form.email,
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
          email: item.email ?? '',
          phone: item.phone ?? '',
          country: item.address?.country ?? '',
          state: item.address?.state ?? '',
          city: item.address?.city ?? '',
          zipCode: item.address?.zip ?? '',
          line1: item.address?.address_line_1 ?? '',
          line2: item.address?.address_line_2 ?? ''
        }))
      )

      toast.success(formatMessage(targetMetaFormMessages.updatedSuccessfully))
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
        title={formatMessage(organizationFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(organizationFormMessages.itemTitle)}
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

export default OrganizationsForm
