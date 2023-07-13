import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  laborFormMessages,
  targetFormsGeneralMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import useTargetMeta from 'hooks/useTargetMeta'
import { useTechnique } from 'context/Technique'
import { ResponseData } from 'types/api'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import useToast from 'hooks/useToast'

interface FormValues extends AddressFormValues {
  id?: string
  name: string
  job: string
  phone: string
  email: string
}

interface DeleteInterface {
  status: boolean
  response?: ResponseData
}

const LaborForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)
  const { launchToast } = useToast()
  const { target } = useTechnique()
  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')
  const actions = useTargetMeta(target?.id ?? '', 'jobs')
  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'labor-organization-name',
        label: formatMessage(laborFormMessages.organizationName),
        placeholder: formatMessage(
          laborFormMessages.organizationNamePlaceholder
        )
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'job',
      options: {
        id: 'labor-company-job',
        label: formatMessage(laborFormMessages.job),
        placeholder: formatMessage(laborFormMessages.jobPlaceholder)
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        id: 'labor-company-email',
        label: formatMessage(formMessages.email),
        placeholder: formatMessage(targetFormsGeneralMessages.emailPlaceholder)
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'labor-company-phone',
        label: formatMessage(targetFormsGeneralMessages.phone),
        placeholder: formatMessage(targetFormsGeneralMessages.phonePlaceholder)
      },
      breakpoints: { xs: 3 }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      job: yup.string().required(formatMessage(formMessages.required)),
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
        text: formatMessage(laborFormMessages.organizationAddress),
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
          name: item.organization ?? '',
          job: item.position ?? '',
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
    } catch {}
  }

  const updateData = async (values: FormValues[]): Promise<void> => {
    try {
      const response = await actions.update(
        values.map((form) => ({
          id: form.id,
          organization: form.name,
          position: form.job,
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
          name: item.organization ?? '',
          job: item.position ?? '',
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

  const resetData = async (ids: string[]): Promise<boolean> => {
    try {
      // TODO: Agregar modal de reset
      const responses = await Promise.all<Promise<DeleteInterface>>(
        ids.map(
          async (id) =>
            await actions
              .delete(id)
              .then((response) => ({
                response,
                status: true
              }))
              .catch(() => ({
                status: false
              }))
        )
      )

      return !responses.some((rsp) => !rsp.status)
    } catch {
      return false
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <DeleteFormConfirmation onAction={deleteFormConfirm} />
      <AccordionForm<FormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(laborFormMessages.title)}
        itemTitle={formatMessage(laborFormMessages.itemTitle)}
        withSections={{
          renderMainSection: true,
          sections
        }}
        initialData={initialData}
        onSubmit={updateData}
        onDelete={deleteData}
        onReset={resetData}
      />
    </div>
  )
}

export default LaborForm
