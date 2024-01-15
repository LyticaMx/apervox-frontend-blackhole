import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement, useEffect, useState } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import {
  accountBankFormMessages,
  targetFormsGeneralMessages,
  targetMetaFormMessages
} from 'views/Technique/messages'
import { useBankAccountOptions } from './hooks/useBankAccountOptions'
import useToast from 'hooks/useToast'
import { useTechnique } from 'context/Technique'
import useTargetMeta from 'hooks/useTargetMeta'
import { TechniqueTabs } from 'types/technique'
import DeleteFormConfirmation from './DeleteFormConfirmation'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import { onlyLetters, simpleText } from 'utils/patterns'

interface FormValues {
  id?: string
  bankname: string
  accountNumber: string
  type: string
  otherType: string
  balance: string
  currency: string
  otherCurrency: string
  comments: string
}

const AccountBankForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const [initialData, setInitialData] = useState<FormValues[] | undefined>()
  const [deleteFormConfirm, setDeleteFormConfirm] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null)
  const { bankAccountTypes, currencies } = useBankAccountOptions()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'bank-accounts')
  const ability = useAbility()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'bankname',
      options: {
        id: 'bankname',
        label: formatMessage(accountBankFormMessages.bank),
        placeholder: formatMessage(accountBankFormMessages.bankPlaceholder),
        labelSpacing: '1',
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 }
    },
    {
      type: 'text',
      name: 'accountNumber',
      options: {
        id: 'account-number',
        label: formatMessage(accountBankFormMessages.accountNumber),
        placeholder: formatMessage(
          accountBankFormMessages.accountNumberPlaceholder
        ),
        labelSpacing: '1',
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 }
    },
    {
      type: 'select',
      name: 'type',
      options: {
        label: formatMessage(accountBankFormMessages.accountType),
        clearable: false,
        placeholder: formatMessage(
          accountBankFormMessages.accountTypePlaceholder
        ),
        items: bankAccountTypes,
        portal: true,
        textField: 'text',
        valueField: 'value',
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 }
    },
    {
      type: 'text',
      name: 'otherType',
      options: {
        id: 'other-type',
        label: formatMessage(accountBankFormMessages.otherAccountType),
        placeholder: formatMessage(
          accountBankFormMessages.otherAccountTypePlaceholder
        ),
        labelSpacing: '1',
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 },
      renderIf: {
        type: 'other'
      }
    },
    {
      type: 'text',
      name: 'balance',
      options: {
        id: 'balance',
        label: formatMessage(accountBankFormMessages.balance),
        placeholder: formatMessage(accountBankFormMessages.balancePlaceholder),
        labelSpacing: '1',
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 }
    },
    {
      type: 'select',
      name: 'currency',
      options: {
        clearable: false,
        label: formatMessage(accountBankFormMessages.currency),
        placeholder: formatMessage(accountBankFormMessages.currencyPlaceholder),
        items: currencies,
        textField: 'text',
        valueField: 'value',
        portal: true,
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 }
    },
    {
      type: 'text',
      name: 'otherCurrency',
      options: {
        id: 'otherCurrency',
        label: formatMessage(accountBankFormMessages.otherCurrency),
        placeholder: formatMessage(
          accountBankFormMessages.otherCurrencyPlaceholder
        ),
        labelSpacing: '1',
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 },
      renderIf: {
        currency: 'other'
      }
    },
    {
      type: 'text',
      name: 'comments',
      options: {
        id: 'comments',
        label: formatMessage(targetFormsGeneralMessages.comments),
        placeholder: formatMessage(
          targetFormsGeneralMessages.commentsPlaceholder
        ),
        multiline: true,
        rows: 4,
        labelSpacing: '1',
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 12, md: 6 }
    }
  ]

  const validationSchema = yup.object({
    bankname: yup
      .string()
      .required(formatMessage(formMessages.required))
      .matches(onlyLetters, formatMessage(formMessages.onlyLetters)),
    accountNumber: yup.string().required(formatMessage(formMessages.required)),
    type: yup.string().required(formatMessage(formMessages.required)),
    otherType: yup
      .string()
      .when('type', (type, field) =>
        type === 'other'
          ? yup.string().required(formatMessage(formMessages.required))
          : field
      ),
    balance: yup
      .number()
      .typeError(formatMessage(formMessages.mustBeNumber))
      .required(formatMessage(formMessages.required)),
    currency: yup.string().required(formatMessage(formMessages.required)),
    otherCurrency: yup
      .string()
      .when('currency', (type, field) =>
        type === 'other'
          ? yup
              .string()
              .required(formatMessage(formMessages.required))
              .matches(onlyLetters, formatMessage(formMessages.onlyLetters))
          : field
      ),
    comments: yup.string().matches(simpleText, {
      excludeEmptyString: true,
      message: formatMessage(formMessages.invalidSimpleText)
    })
  })

  const getData = async (): Promise<void> => {
    try {
      const response = await actions.get()
      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          bankname: item.institution ?? '',
          accountNumber: item.account_number ?? '',
          balance: item.balance ?? '',
          type: item.type ?? '',
          otherType: item.other_type ?? '',
          currency: item.currency ?? '',
          otherCurrency: item.other_currency ?? '',
          comments: item.comments ?? ''
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
          body.institution = form.bankname
          body.account_number = form.accountNumber
          body.balance = parseFloat(form.balance)
          body.type = form.type
          if (form.type === 'other') body.other_type = form.otherType
          body.currency = form.currency
          if (form.currency === 'other') {
            body.other_currency = form.otherCurrency
          }
          body.comments = form.comments

          return body
        })
      )

      setInitialData(
        response.data.map((item) => ({
          id: item.id,
          bankname: item.institution ?? '',
          accountNumber: item.account_number ?? '',
          balance: item.balance ?? '',
          type: item.type ?? '',
          otherType: item.other_type ?? '',
          currency: item.currency ?? '',
          otherCurrency: item.other_currency ?? '',
          comments: item.comments ?? ''
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
        title={formatMessage(accountBankFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(accountBankFormMessages.itemTitle)}
        initialData={initialData}
        onSubmit={updateData}
        onDelete={deleteData}
      />
    </div>
  )
}

export default AccountBankForm
