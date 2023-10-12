import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import { useGlobalMessage } from 'hooks/useIntl'
import {
  academicFormMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'
import { TechniqueTabs } from 'types/technique'
import useToast from 'hooks/useToast'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

interface FormValues extends AddressFormValues {
  id?: string
  name: string
  specialty: string
  phone: string
  email: string
}

const AcademicForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)
  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')
  const getGlobalMessage = useGlobalMessage()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'academics')
  const ability = useAbility()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        labelSpacing: '1',
        id: 'academic-name',
        label: formatMessage(academicFormMessages.academicName),
        placeholder: formatMessage(
          academicFormMessages.academicNamePlaceholder
        ),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'specialty',
      options: {
        labelSpacing: '1',
        id: 'academic-specialty',
        label: formatMessage(academicFormMessages.specialty),
        placeholder: formatMessage(academicFormMessages.specialtyPlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        labelSpacing: '1',
        id: 'academic-email',
        label: getGlobalMessage('email', 'formMessages'),
        placeholder: formatMessage(
          academicFormMessages.academicEmailPlaceholder
        ),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        labelSpacing: '1',
        id: 'academic-phone',
        label: formatMessage(academicFormMessages.academicPhone),
        placeholder: formatMessage(
          academicFormMessages.academicPhonePlaceholder
        ),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 3 }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      specialty: yup.string().required(formatMessage(formMessages.required)),
      email: yup
        .string()
        .trim()
        .email(formatMessage(formMessages.invalidEmail))
        .required(formatMessage(formMessages.required)),
      phone: yup.string().required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(academicFormMessages.institutionAddress),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 1
    }
  ]

  const getData = async (): Promise<void> => {
    try {
      const response = await actions.get()
      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          name: item.institution ?? '',
          specialty: item.specialty ?? '',
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
    } catch {
      techniqueActions?.setActiveTab(TechniqueTabs.GENERAL_DATA)
    }
  }

  const updateData = async (values: FormValues[]): Promise<void> => {
    try {
      const response = await actions.update(
        values.map((form) => ({
          id: form.id,
          institution: form.name,
          specialty: form.specialty,
          email: form.email,
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

      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          name: item.institution ?? '',
          specialty: item.specialty ?? '',
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
        title={formatMessage(academicFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(academicFormMessages.itemTitle)}
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

export default AcademicForm
