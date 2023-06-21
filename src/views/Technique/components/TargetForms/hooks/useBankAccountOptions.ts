import { useFormatMessage } from 'hooks/useIntl'
import { accountBankFormMessages } from 'views/Technique/messages'

export const useBankAccountOptions = (): {
  bankAccountTypes: Array<Record<string, string>>
  currencies: Array<Record<string, string>>
} => {
  const getMessage = useFormatMessage(accountBankFormMessages)

  const bankAccountTypes = [
    { text: getMessage('savings'), value: 'savings' },
    { text: getMessage('creditCard'), value: 'credit_card' },
    { text: getMessage('debitCard'), value: 'debit_card' },
    { text: getMessage('checking'), value: 'checking' },
    { text: getMessage('payroll'), value: 'payroll' },
    { text: getMessage('investment'), value: 'investment' },
    { text: getMessage('loan'), value: 'loan' },
    { text: getMessage('other'), value: 'other' }
  ]

  const currencies = [
    { text: getMessage('usd'), value: 'usd' },
    { text: getMessage('mxn'), value: 'mxn' },
    { text: getMessage('eur'), value: 'eur' },
    { text: getMessage('jpy'), value: 'jpy' },
    { text: getMessage('gbp'), value: 'gbp' },
    { text: getMessage('aud'), value: 'aud' },
    { text: getMessage('cad'), value: 'cad' },
    { text: getMessage('chf'), value: 'chf' },
    { text: getMessage('cny'), value: 'cny' },
    { text: getMessage('brl'), value: 'brl' },
    { text: getMessage('other'), value: 'other' }
  ]

  return { bankAccountTypes, currencies }
}
