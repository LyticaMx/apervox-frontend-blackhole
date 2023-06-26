import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import {
  accountBankFormMessages,
  targetFormsGeneralMessages
} from 'views/Technique/messages'
import { useBankAccountOptions } from './hooks/useBankAccountOptions'

interface FormValues {
  bankname: string
  accountNumber: string
  type: string
  otherType: string
  balance: string
  currency: string
  otherCurrency: string
  comments?: string
}

const AccountBankForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { bankAccountTypes, currencies } = useBankAccountOptions()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'bankname',
      options: {
        id: 'bankname',
        label: formatMessage(accountBankFormMessages.bank),
        placeholder: formatMessage(accountBankFormMessages.bankPlaceholder),
        labelSpacing: '1'
      },
      breakpoints: { xs: 12, md: 3 }
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
        labelSpacing: '1'
      },
      breakpoints: { xs: 12, md: 3 }
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
        valueField: 'value'
      },
      breakpoints: { xs: 12, md: 3 }
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
        labelSpacing: '1'
      },
      breakpoints: { xs: 12, md: 3 },
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
        labelSpacing: '1'
      },
      breakpoints: { xs: 12, md: 3 }
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
        portal: true
      },
      breakpoints: { xs: 12, md: 3 }
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
        labelSpacing: '1'
      },
      breakpoints: { xs: 12, md: 3 },
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
        labelSpacing: '1'
      },
      breakpoints: { xs: 12, md: 6 }
    }
  ]

  const validationSchema = yup.object({
    bankname: yup.string().required(formatMessage(formMessages.required)),
    amount: yup.string().required(formatMessage(formMessages.required)),
    bankCredit: yup.string().required(formatMessage(formMessages.required))
  })

  return (
    <div>
      <AccordionForm<FormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(accountBankFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(accountBankFormMessages.itemTitle)}
      />
    </div>
  )
}

export default AccountBankForm
