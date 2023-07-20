import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { generalDataFormMessages } from 'views/Technique/messages'
import { useTechnique } from 'context/Technique'
import { get } from 'lodash'
import { useTargets } from 'context/Targets'

interface FormValues {
  name: string
  phone: string
  overflowLine: any
  carrier: any
  endDate: string
}

const GeneralDataForm = (): ReactElement => {
  const getMessage = useFormatMessage(generalDataFormMessages)
  const getGlobalMessage = useGlobalMessage()
  const { target, techniqueId } = useTechnique()
  const { actions } = useTargets()

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
      type: 'async-select',
      name: 'overflowLine',
      options: {
        asyncProps: {
          api: {
            endpoint: 'overflow-lines',
            method: 'get'
          },
          value: 'id',
          label: 'phone',
          searchField: 'phone'
        },
        debounceTimeout: 300,
        label: getMessage('overflowLine'),
        placeholder: getMessage('phonePlaceholder')
      },
      breakpoints: { xs: 4 }
    },
    {
      type: 'async-select',
      name: 'carrier',
      options: {
        asyncProps: {
          api: {
            endpoint: 'carriers',
            method: 'get'
          },
          value: 'id',
          label: 'name',
          searchField: 'name'
        },
        label: getMessage('carrier'),
        placeholder: getMessage('carrierPlaceholder'),
        debounceTimeout: 300
      },
      breakpoints: { xs: 4 }
    },
    {
      type: 'date',
      name: 'endDate',
      options: {
        id: 'general-data-enddate',
        label: getMessage('endDate'),
        placeholder: getMessage('endDatePlaceholder'),
        formatDisplay: 'dd-MM-yyyy'
      },
      breakpoints: { xs: 4 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    phone: yup.string().required(getMessage('required')),
    overflowLine: yup.mixed().required(getMessage('required')),
    carrier: yup.mixed().required(getMessage('required'))
  })

  const getAsyncValue = (item: any, value: string, label: string): any => {
    if (!item) return null

    return {
      value: get(item, value),
      label: get(item, label)
    }
  }

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      enableReinitialize: true,
      initialValues: {
        name: target?.alias ?? '',
        phone: target?.phone ?? '',
        overflowLine: getAsyncValue(target?.overflow_line, 'id', 'phone'),
        carrier: getAsyncValue(target?.carrier, 'id', 'name'),
        endDate: target?.end_date ?? ''
      },
      validationSchema,
      onSubmit: async (values) => {
        if (target) {
          const res = await actions?.update({
            id: target.id,
            alias: values.name,
            phone: values.phone,
            overflow_line_id: values.overflowLine.value ?? null,
            carrier_id: values.carrier.value ?? null,
            has_end_date: !!values.endDate,
            end_date: values.endDate
              ? (values.endDate as unknown as Date).toISOString()
              : '',
            type: 'conventional'
          })

          if (res) {
            actions?.getData({ technique_id: techniqueId })
          }
        }
      }
    }),
    [target]
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
