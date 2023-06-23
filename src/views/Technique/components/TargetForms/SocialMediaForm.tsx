import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages, generalMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import { socialMediaFormMessages } from 'views/Technique/messages'

interface FormValues {
  name: string
  url: string
  username: string
}

const SocialMediaForm = (): ReactElement => {
  const { formatMessage } = useIntl()

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
        placeholder: formatMessage(socialMediaFormMessages.urlPlaceholder)
      },
      breakpoints: { xs: 12, md: 4, sm: 6 }
    },
    {
      type: 'text',
      name: 'username',
      options: {
        id: 'social-media-username',
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

  return (
    <div>
      <AccordionForm<FormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(socialMediaFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(socialMediaFormMessages.itemTitle)}
      />
    </div>
  )
}

export default SocialMediaForm
