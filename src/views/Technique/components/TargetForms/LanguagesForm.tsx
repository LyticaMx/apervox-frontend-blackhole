import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import {
  languagesFormMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import useLanguagesOptions from './hooks/useLanguagesOptions'
import useToast from 'hooks/useToast'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'
import { TechniqueTabs } from 'types/technique'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import { onlyLetters } from 'utils/patterns'

interface FormValues {
  id?: string
  language: string
  otherLanguage: string
  level: string
}

const LanguagesForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)
  const { language, languageProficiency } = useLanguagesOptions()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'language-levels')
  const ability = useAbility()

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
        portal: true,
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
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
        ),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
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
        portal: true,
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
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
          ? yup
              .string()
              .required(formatMessage(formMessages.required))
              .matches(onlyLetters, formatMessage(formMessages.onlyLetters))
          : field
      ),
    level: yup.string().required(formatMessage(formMessages.required))
  })

  const getData = async (): Promise<void> => {
    try {
      const response = await actions.get()
      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          language: item.language ?? '',
          otherLanguage: item.other ?? '',
          level: item.proficiency ?? ''
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
          const body: Record<string, any> = {}
          body.id = form.id
          body.language = form.language
          if (form.language === 'other') body.other = form.otherLanguage
          body.proficiency = form.level

          return body
        })
      )

      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          language: item.language ?? '',
          otherLanguage: item.other ?? '',
          level: item.proficiency ?? ''
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
        title={formatMessage(languagesFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(languagesFormMessages.itemTitle)}
        initialData={initialData}
        onSubmit={updateData}
        onDelete={deleteData}
      />
    </div>
  )
}

export default LanguagesForm
