import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'

import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import Accordion from 'components/Accordion'
import Form from 'components/Form'
import Typography from 'components/Typography'
import { Field } from 'types/form'

interface FormValues {
  bankname: string
  amount: string
  bankCredit: string
  comments?: string
}

interface FormProps {
  initialValues?: FormValues
  onSubmit?: (values: FormValues) => void
}

const FormComponent = ({
  initialValues,
  onSubmit
}: FormProps): ReactElement => {
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
    bankname: yup.string().required('Requerido'),
    amount: yup.string().required('Requerido'),
    bankCredit: yup.string().required('Requerido')
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        bankname: initialValues?.bankname ?? '',
        amount: initialValues?.amount ?? '',
        bankCredit: initialValues?.bankCredit ?? '',
        comments: initialValues?.comments ?? ''
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values)

        if (onSubmit) onSubmit(values)
      }
    }),
    [initialValues]
  )

  return (
    <Form
      formikConfig={formikConfig}
      fields={fields}
      submitButtonPosition="right"
      renderSubmitButton={false}
    />
  )
}

const AccountBankForm = (): ReactElement => {
  // const onSubmit = async (values: any): Promise<any> => {
  //   console.log('formValues', values)
  // }

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-2">
        <Typography variant="title" style="bold">
          CUENTAS BANCARIAS
        </Typography>

        <PlusCircleIcon
          className="w-8 h-8 cursor-pointer text-primary hover:text-primary-700"
          onClick={() => alert('Add new language')}
        />
      </div>

      <Accordion
        useCustomTitle
        title={
          <div className="flex justify-between w-full">
            <Typography
              variant="subtitle"
              style="semibold"
              className="uppercase"
            >
              Cuenta bancaria 1
            </Typography>
          </div>
        }
        classNames={{
          button: 'bg-white mt-1 rounded-md items-center rounded-b-none',
          chevronIcon: 'text-primary-500'
        }}
      >
        <div className="bg-white p-2.5 rounded-b-md">
          <FormComponent />
        </div>
      </Accordion>

      <Accordion
        useCustomTitle
        title={
          <div className="flex justify-between w-full pr-2">
            <Typography
              variant="subtitle"
              style="semibold"
              className="uppercase"
            >
              Cuenta bancaria 2
            </Typography>
          </div>
        }
        classNames={{
          button: 'bg-white mt-1 rounded-md items-center rounded-b-none',
          chevronIcon: 'text-primary-500'
        }}
      >
        <div className="bg-white p-2 rounded-b-md">
          <FormComponent />

          <div className="flex justify-end w-full mt-4">
            <TrashIcon
              className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-700"
              onClick={() => alert('Add new language')}
            />
          </div>
        </div>
      </Accordion>

      <Accordion
        useCustomTitle
        title={
          <div className="flex justify-between w-full pr-2">
            <Typography
              variant="subtitle"
              style="semibold"
              className="uppercase"
            >
              Cuenta bancaria 3
            </Typography>
          </div>
        }
        classNames={{
          button: 'bg-white mt-1 rounded-md items-center rounded-b-none',
          chevronIcon: 'text-primary-500'
        }}
      >
        <div className="bg-white p-2 rounded-b-md">
          <FormComponent />

          <div className="flex justify-end w-full mt-4">
            <TrashIcon
              className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-700"
              onClick={() => alert('Add new language')}
            />
          </div>
        </div>
      </Accordion>
    </div>
  )
}

export default AccountBankForm
