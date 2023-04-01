import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { formMessages } from 'globalMessages'

interface FormValues {
  name: string
  objectiveNumber: string
  derivationLine: string
  phoneCompany: string
  endDate: string
}

interface Props {
  initialValues?: FormValues
}

const GeneralDataForm = ({ initialValues }: Props): ReactElement => {
  const getMessage = useFormatMessage(formMessages)
  const getGlobalMessage = useGlobalMessage()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'general-data-name',
        label: 'Alias / Nombre del objetivo',
        placeholder: 'Ej. José Mendez'
      },
      breakpoints: { xs: 4 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'general-data-phone',
        label: 'Número del objetivo',
        placeholder: 'Ej. 5533445566'
      },
      breakpoints: { xs: 4 }
    },
    {
      type: 'select',
      name: 'derivationLine',
      options: {
        label: 'Línea de derivación',
        clearable: true,
        placeholder: 'Ej. 5693678905',
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
        label: 'Compañía teléfonica',
        clearable: true,
        placeholder: 'Ej. Telcel',
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
      name: 'birthdate',
      options: {
        id: 'general-data-enddate',
        label: 'Fecha de finalización',
        placeholder: 'Ej. 12/12/2022 - 13:00:00'
      },
      breakpoints: { xs: 4 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    objectiveNumber: yup.string().required(getMessage('required')),
    derivationLine: yup.string().required(getMessage('required')),
    phoneCompany: yup.string().required(getMessage('required')),
    endDate: yup.string().required(getMessage('required'))
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        objectiveNumber: initialValues?.name ?? '',
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
