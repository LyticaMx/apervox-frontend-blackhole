import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'
import {
  accountBankFormMessages,
  targetFormsGeneralMessages
} from 'views/Techniques/messages'

interface FormValues {
  bankname: string
  amount: string
  bankCredit: string
  comments?: string
}

const AccountBankForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'bankname',
      options: {
        id: 'social-media-bankname',
        label: formatMessage(accountBankFormMessages.bank),
        placeholder: formatMessage(accountBankFormMessages.bankPlaceholder)
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'amount',
      options: {
        id: 'social-media-amount',
        label: formatMessage(accountBankFormMessages.ammount),
        placeholder: formatMessage(accountBankFormMessages.ammountPlaceholder)
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'select',
      name: 'cardstype',
      options: {
        label: formatMessage(accountBankFormMessages.cardType),
        clearable: true,
        placeholder: formatMessage(accountBankFormMessages.cardTypePlaceholder),
        items: [
          {
            id: '1',
            label: formatMessage(accountBankFormMessages.creditType)
          },
          {
            id: '2',
            label: formatMessage(accountBankFormMessages.debitType)
          },
          {
            id: '3',
            label: formatMessage(accountBankFormMessages.payrollType)
          }
        ],
        textField: 'label',
        valueField: 'id',
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: 'w-[95%]'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'bankCredit',
      options: {
        id: 'social-media-bank-credit',
        label: formatMessage(accountBankFormMessages.creditBank),
        placeholder: formatMessage(
          accountBankFormMessages.creditBankPlaceholder
        )
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'comments',
      options: {
        id: 'social-media-comments',
        label: formatMessage(targetFormsGeneralMessages.comments),
        placeholder: formatMessage(
          targetFormsGeneralMessages.commentsPlaceholder
        ),
        multiline: true,
        rows: 4
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
