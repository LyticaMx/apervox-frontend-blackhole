import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages, generalMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import {
  socialMediaFormMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import useToast from 'hooks/useToast'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import { TechniqueTabs } from 'types/technique'

interface FormValues {
  id?: string
  name: string
  other?: string
  url: string
  username: string
}

const SocialMediaForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'social-networks')
  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)

  const socialmedia = [
    { value: 'facebook', text: 'Facebook' },
    { value: 'instagram', text: 'Instagram' },
    { value: 'twitter', text: 'Twitter' },
    { value: 'linkedin', text: 'Linkedin' },
    { value: 'youtube', text: 'Youtube' },
    { value: 'snapchat', text: 'Snapchat' },
    { value: 'pinterest', text: 'Pinterest' },
    { value: 'tiktok', text: 'Tiktok' },
    { value: 'other', text: formatMessage(generalMessages.other) }
  ]

  const fields: Array<Field<FormValues>> = [
    {
      type: 'select',
      name: 'name',
      options: {
        clearable: false,
        label: formatMessage(socialMediaFormMessages.name),
        placeholder: formatMessage(socialMediaFormMessages.namePlaceholder),
        items: socialmedia,
        textField: 'text',
        valueField: 'value',
        portal: true
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'other',
      options: {
        labelSpacing: '1',
        id: 'other-language',
        label: formatMessage(socialMediaFormMessages.otherSocialMedia),
        placeholder: formatMessage(
          socialMediaFormMessages.otherSocialMediaPlaceholder
        )
      },
      breakpoints: { xs: 12, md: 4, sm: 6 },
      renderIf: {
        name: 'other'
      }
    },
    {
      type: 'text',
      name: 'url',
      options: {
        id: 'social-media-url',
        label: 'URL',
        labelSpacing: '1',
        placeholder: formatMessage(socialMediaFormMessages.urlPlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'username',
      options: {
        id: 'social-media-username',
        labelSpacing: '1',
        label: formatMessage(socialMediaFormMessages.username),
        placeholder: formatMessage(socialMediaFormMessages.usernamePlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(formatMessage(formMessages.required)),
    other: yup
      .string()
      .when('name', (value, field) =>
        value === 'other'
          ? yup.string().required(formatMessage(formMessages.required))
          : field
      ),
    url: yup.string().required(formatMessage(formMessages.required)),
    username: yup.string().required(formatMessage(formMessages.required))
  })

  const getData = async (): Promise<void> => {
    try {
      const response = await actions.get()
      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          name: item.name ?? '',
          url: item.url ?? '',
          username: item.username ?? '',
          other: item.other
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
          url: form.url,
          username: form.username,
          other: form.name === 'other' ? form.other : undefined
        }))
      )

      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          name: item.name ?? '',
          url: item.url ?? '',
          username: item.username ?? '',
          other: item.other
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
        title={formatMessage(socialMediaFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(socialMediaFormMessages.itemTitle)}
        initialData={initialData}
        onSubmit={updateData}
        onDelete={deleteData}
      />
    </div>
  )
}

export default SocialMediaForm
