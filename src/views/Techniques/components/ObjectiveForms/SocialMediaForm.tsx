import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import { socialMediaFormMessages } from 'views/Techniques/messages'

interface FormValues {
  name: string
  url: string
  username: string
}

const SocialMediaForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'social-media-name',
        label: formatMessage(socialMediaFormMessages.name),
        placeholder: formatMessage(socialMediaFormMessages.namePlaceholder)
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'url',
      options: {
        id: 'social-media-url',
        label: 'URL',
        placeholder: formatMessage(socialMediaFormMessages.urlPlaceholder)
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'username',
      options: {
        id: 'social-media-username',
        label: formatMessage(socialMediaFormMessages.username),
        placeholder: formatMessage(socialMediaFormMessages.usernamePlaceholder)
      },
      breakpoints: { xs: 12, md: 3 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(formatMessage(formMessages.required)),
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
