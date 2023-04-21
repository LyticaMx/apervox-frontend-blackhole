import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { generalDataFormMessages } from 'views/Technique/messages'

interface FormValues {
  name: string
  targetNumber: string
  derivationLine: string
  phoneCompany: string
  endDate: string
}

interface Props {
  initialValues?: FormValues
}

const GeneralDataForm = ({ initialValues }: Props): ReactElement => {
  const getMessage = useFormatMessage(generalDataFormMessages)
  const getGlobalMessage = useGlobalMessage()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'general-data-name',
        label: getMessage('name'),
        placeholder: getMessage('namePlaceholder')
      },
      breakpoints: { xs: 4 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'general-data-phone',
        label: getMessage('phone'),
        placeholder: getMessage('phonePlaceholder')
      },
      breakpoints: { xs: 4 }
    },
    {
      type: 'select',
      name: 'derivationLine',
      options: {
        label: getMessage('overflowLine'),
        clearable: true,
        placeholder: getMessage('phonePlaceholder'),
        items: [
          {
            id: '1',
            label: '5693678905'
          },
          {
            id: '2',
            label: '5693678906'
          },
          {
            id: '3',
            label: '5693678907'
          },
          {
            id: '4',
            label: '5693678908'
          },
          {
            id: '5',
            label: '5693678909'
          }
        ],
        textField: 'label',
        valueField: 'id',
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: 'w-[95%]'
      },
      breakpoints: { xs: 4 }
    },
    {
      type: 'select',
      name: 'phoneCompany',
      options: {
        label: getMessage('carrier'),
        clearable: true,
        placeholder: getMessage('carrierPlaceholder'),
        items: [
          {
            id: '1',
            label: 'Telcel'
          },
          {
            id: '2',
            label: 'Movistar'
          },
          {
            id: '3',
            label: 'AT&T'
          },
          {
            id: '4',
            label: 'Unefon'
          }
        ],
        textField: 'label',
        valueField: 'id',
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: 'w-[95%]'
      },
      breakpoints: { xs: 4 }
    },
    {
      type: 'text',
      name: 'endDate',
      options: {
        id: 'general-data-enddate',
        label: getMessage('endDate'),
        placeholder: getMessage('endDatePlaceholder')
      },
      breakpoints: { xs: 4 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    targetNumber: yup.string().required(getMessage('required')),
    derivationLine: yup.string().required(getMessage('required')),
    phoneCompany: yup.string().required(getMessage('required')),
    endDate: yup.string().required(getMessage('required'))
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        targetNumber: initialValues?.name ?? '',
        derivationLine: initialValues?.name ?? '',
        phoneCompany: initialValues?.name ?? '',
        endDate: initialValues?.name ?? ''
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values)
      }
    }),
    [initialValues]
  )

  return (
    <div className="bg-white p-2 py-4 rounded-md w-full">
      <Form
        formikConfig={formikConfig}
        fields={fields}
        submitButtonPosition="right"
        submitButtonLabel={getGlobalMessage('save', 'actionsMessages')}
        submitButtonProps={{
          color: 'indigo',
          variant: 'contained'
        }}
        className="user-account-data-form"
      />
    </div>
  )
}

export default GeneralDataForm
