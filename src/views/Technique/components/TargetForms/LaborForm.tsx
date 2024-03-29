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
import { TechniqueTabs } from 'types/technique'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import { phoneNumber, simpleText } from 'utils/patterns'

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
  const { target, actions: techniqueActions } = useTechnique()
  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')
  const actions = useTargetMeta(target?.id ?? '', 'jobs')
  const ability = useAbility()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'labor-organization-name',
        label: formatMessage(laborFormMessages.organizationName),
        placeholder: formatMessage(
          laborFormMessages.organizationNamePlaceholder
        ),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'job',
      options: {
        id: 'labor-company-job',
        label: formatMessage(laborFormMessages.job),
        placeholder: formatMessage(laborFormMessages.jobPlaceholder),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        id: 'labor-company-email',
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
        id: 'labor-company-phone',
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
      job: yup
        .string()
        .required(formatMessage(formMessages.required))
        .matches(simpleText, formatMessage(formMessages.invalidSimpleText)),
      email: yup
        .string()
        .trim()
        .email(formatMessage(formMessages.invalidEmail)),
      phone: yup.string().matches(phoneNumber, {
        excludeEmptyString: true,
        message: formatMessage(formMessages.invalidPhoneNumber)
      })
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
    } catch {
      techniqueActions?.setActiveTab(TechniqueTabs.GENERAL_DATA)
    }
  }

  const updateData = async (values: FormValues[]): Promise<void> => {
    try {
      const response = await actions.update(
        values.map((form) => {
          const excludedKeys = ['state', 'city']
          for (const key in form) {
            if (!excludedKeys.includes(key) && form[key] === '') {
              form[key] = null
            }
          }
          return {
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
          }
        })
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
    if (!target?.id) return
    getData()
  }, [target?.id])

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
