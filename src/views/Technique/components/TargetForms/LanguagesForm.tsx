import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import { languagesFormMessages } from 'views/Technique/messages'
import useLanguagesOptions from './hooks/useLanguagesOptions'

interface FormValues {
  language: string
  otherLanguage: string
  level: string
}

const LanguagesForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { language, languageProficiency } = useLanguagesOptions()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'select',
      name: 'language',
      options: {
        label: formatMessage(languagesFormMessages.language),
        clearable: false,
        placeholder: formatMessage(languagesFormMessages.languagePlaceholder),
        items: language,
        textField: 'text',
        valueField: 'value',
        portal: true
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'otherLanguage',
      options: {
        labelSpacing: '1',
        id: 'other-language',
        label: formatMessage(languagesFormMessages.otherLanguage),
        placeholder: formatMessage(
          languagesFormMessages.otherLanguagePlaceholder
        )
      },
      breakpoints: { xs: 12, md: 6 },
      renderIf: {
        language: 'other'
      }
    },
    {
      type: 'select',
      name: 'level',
      options: {
        label: formatMessage(languagesFormMessages.level),
        clearable: false,
        placeholder: formatMessage(languagesFormMessages.levelPlaceholder),
        items: languageProficiency,
        textField: 'text',
        valueField: 'value',
        portal: true
      },
      breakpoints: { xs: 12, md: 6 }
    }
  ]

  const validationSchema = yup.object({
    language: yup.string().required(formatMessage(formMessages.required)),
    otherLanguage: yup
      .string()
      .when('language', (value, field) =>
        value === 'other'
          ? yup.string().required(formatMessage(formMessages.required))
          : field
      ),
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
