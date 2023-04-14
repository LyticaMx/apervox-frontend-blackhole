import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import { languagesFormMessages } from 'views/Techniques/messages'

interface FormValues {
  name: string
  level: string
}

const LanguagesForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'technique-name',
        label: formatMessage(languagesFormMessages.language),
        placeholder: formatMessage(languagesFormMessages.languagePlaceholder)
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'level',
      options: {
        id: 'techinque-description',
        label: formatMessage(languagesFormMessages.level),
        placeholder: formatMessage(languagesFormMessages.levelPlaceholder)
      },
      breakpoints: { xs: 12, md: 6 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(formatMessage(formMessages.required)),
    level: yup.string().required(formatMessage(formMessages.required))
  })

  return (
    <div>
      <AccordionForm<FormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(languagesFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(languagesFormMessages.itemTitle)}
      />
    </div>
  )
}

export default LanguagesForm
