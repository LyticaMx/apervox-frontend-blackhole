import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages, generalMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  companiesFormMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import useToast from 'hooks/useToast'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'
import { TechniqueTabs } from 'types/technique'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

interface FormValues extends AddressFormValues {
  id?: string
  name: string
  sector: string
  other_sector?: string
  comments?: string
}

const CompaniesForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'companies')
  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)
  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')
  const ability = useAbility()

  const sector = [
    {
      value: 'agriculture',
      text: formatMessage(companiesFormMessages.agriculture)
    },
    { value: 'commerce', text: formatMessage(companiesFormMessages.commerce) },
    {
      value: 'construction',
      text: formatMessage(companiesFormMessages.construction)
    },
    {
      value: 'education',
      text: formatMessage(companiesFormMessages.education)
    },
    { value: 'finance', text: formatMessage(companiesFormMessages.finance) },
    {
      value: 'manufacturing',
      text: formatMessage(companiesFormMessages.manufacturing)
    },
    { value: 'health', text: formatMessage(companiesFormMessages.health) },
    { value: 'services', text: formatMessage(companiesFormMessages.services) },
    {
      value: 'technology',
      text: formatMessage(companiesFormMessages.technology)
    },
    {
      value: 'transportation',
      text: formatMessage(companiesFormMessages.transportation)
    },
    { value: 'other', text: formatMessage(generalMessages.other) }
  ]
  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        labelSpacing: '1',
        id: 'company-name',
        label: formatMessage(companiesFormMessages.companyName),
        placeholder: formatMessage(
          companiesFormMessages.companyNamePlaceholder
        ),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'select',
      name: 'sector',
      options: {
        clearable: false,
        label: formatMessage(companiesFormMessages.sector),
        placeholder: formatMessage(companiesFormMessages.sectorPlaceholder),
        items: sector,
        textField: 'text',
        valueField: 'value',
        portal: true,
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'other_sector',
      options: {
        labelSpacing: '1',
        id: 'other-sector',
        label: formatMessage(companiesFormMessages.otherSector),
        placeholder: formatMessage(
          companiesFormMessages.otherSectorPlaceholder
        ),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 },
      renderIf: {
        sector: 'other'
      }
    },
    ...addressFields
    // {
    //   type: 'text',
    //   name: 'comments',
    //   section: 'comments',
    //   options: {
    //     labelSpacing: '1',
    //     id: 'company-comments',

    //     placeholder: formatMessage(
    //       targetFormsGeneralMessages.commentsPlaceholder
    //     ),
    //     multiline: true,
    //     rows: 4
    //   },
    //   breakpoints: { xs: 12 }
    // }
  ]

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(companiesFormMessages.companyAddress),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 2
    },
    {
      name: 'comments'
    }
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      sector: yup.string().required(formatMessage(formMessages.required)),
      other_sector: yup
        .string()
        .when('sector', (value, field) =>
          value === 'other'
            ? yup.string().required(formatMessage(formMessages.required))
            : field
        )
    })
    .concat(addressValidationSchema)

  const setItems = (items: any[]): void => {
    setInitialData(
      items.map((item) => ({
        id: item.id,
        name: item.name ?? '',
        sector: item.sector ?? '',
        other_sector: item.other_sector ?? '',
        comments: item.comments ?? '',
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
          sector: form.sector,
          other_sector: form.sector === 'other' ? form.other_sector : undefined,
          comments: form.comments ? form.comments : undefined,
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
        title={formatMessage(companiesFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(companiesFormMessages.itemTitle)}
        withSections={{ renderMainSection: true, sections }}
        initialData={initialData}
        onSubmit={updateData}
        onDelete={deleteData}
      />
    </div>
  )
}

export default CompaniesForm
