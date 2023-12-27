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
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import { phoneNumber } from 'utils/patterns'
import { format } from 'date-fns'
import useToast from 'hooks/useToast'

interface FormValues {
  name: string
  phone: string
  overflowLine: any
  carrier: any
  endDate: Date | null
}

const GeneralDataForm = (): ReactElement => {
  const getMessage = useFormatMessage(generalDataFormMessages)
  const getGlobalMessage = useGlobalMessage()
  const { target, techniqueId } = useTechnique()
  const { actions } = useTargets()
  const ability = useAbility()
  const toast = useToast()

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'general-data-name',
        label: getMessage('name'),
        placeholder: getMessage('namePlaceholder'),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 4 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'general-data-phone',
        label: getMessage('phone'),
        placeholder: getMessage('phonePlaceholder'),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
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
        placeholder: getMessage('phonePlaceholder'),
        disabled:
          ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS) ||
          ability.cannot(ACTION.READ, SUBJECT.OVERFLOW_LINES)
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
        debounceTimeout: 300,
        disabled:
          ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS) ||
          ability.cannot(ACTION.READ, SUBJECT.CARRIERS)
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
        formatDisplay: 'dd-MM-yyyy',
        minDate: format(minDate, 'yyyy-MM-dd'),
        disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
      },
      breakpoints: { xs: 4 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    phone: yup
      .string()
      .required(getMessage('required'))
      .length(10, getMessage('length', { length: 10 }))
      .matches(phoneNumber, {
        message: getMessage('invalidPhoneNumber'),
        name: 'onlyNumbers'
      }),
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
      initialValues: {
        name: target?.alias ?? '',
        phone: target?.phone ?? '',
        overflowLine: getAsyncValue(target?.overflow_line, 'id', 'phone'),
        carrier: getAsyncValue(target?.carrier, 'id', 'name'),
        endDate: target?.has_end_date ? new Date(target?.end_date ?? 0) : null
      },
      enableReinitialize: true,
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
            end_date:
              values.endDate &&
              values.endDate !== new Date(target.end_date ?? 0)
                ? values.endDate.toISOString()
                : '',
            type: 'conventional'
          })

          if (res) {
            actions?.getData({ technique_id: techniqueId })
            toast.success('Objetivo actualizado correctamente')
          } else toast.danger('Error al actualizar el objetivo')
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
          variant: 'contained',
          disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
        }}
        className="user-account-data-form"
      />
    </div>
  )
}

export default GeneralDataForm
