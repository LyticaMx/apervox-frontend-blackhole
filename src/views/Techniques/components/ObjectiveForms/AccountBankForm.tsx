import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'

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
        label: 'Institución bancaria',
        placeholder: 'Ej. Banorte'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'amount',
      options: {
        id: 'social-media-amount',
        label: 'Monto',
        placeholder: 'Ej. $999,999'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'select',
      name: 'cardstype',
      options: {
        label: 'Tipo de tarjetas',
        clearable: true,
        placeholder: 'Ej. Crédito',
        items: [
          {
            id: '1',
            label: 'Crédito'
          },
          {
            id: '2',
            label: 'Debito'
          },
          {
            id: '3',
            label: 'Nomina'
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
        label: 'Crédito bancario',
        placeholder: 'Ej. Auto $254,000'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'comments',
      options: {
        id: 'social-media-comments',
        label: 'Comentarios',
        placeholder: 'Escribe algun comentario aquí',
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
        title="CUENTAS BANCARIAS"
        itemTitle="Cuenta bancaria"
      />
    </div>
  )
}

export default AccountBankForm
