import { ReactElement, useMemo, useState } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'

import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import Grid from 'components/Grid'
import Radio from 'components/Form/Radio'
import { targetFormMessages } from '../messages'

type TargetType = 'etsi' | 'conventional'

export interface FormValues {
  name: string
  number: string
  phoneCompany: any
  overflowLine?: any
  liid?: string
  liidVolte?: string
  type: TargetType
}

interface Props {
  initialValues?: FormValues
  onSubmit: (values: FormValues) => Promise<void>
}

const TargetForm = ({ initialValues, onSubmit }: Props): ReactElement => {
  const getMessage = useFormatMessage(targetFormMessages)
  const getGlobalMessage = useGlobalMessage()

  const [targetType, setTargetType] = useState<TargetType>('etsi')

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'target-name',
        label: getMessage('targetName'),
        placeholder: getMessage('targetNamePlaceholder'),
        labelSpacing: '1',
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'number',
      options: {
        id: 'target-number',
        label: getMessage('targetNumber'),
        placeholder: getMessage('targetNumberPlaceholder'),
        labelSpacing: '1',
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'async-select',
      name: 'phoneCompany',
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
        debounceTimeout: 300,
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    ...((targetType === 'etsi'
      ? [
          {
            type: 'text',
            name: 'liid',
            options: {
              label: 'LIID',
              placeholder: getMessage('phoneExample'),
              labelSpacing: '1',
              requiredMarker: true
            },
            breakpoints: { xs: 12 }
          },
          {
            type: 'text',
            name: 'liidVolte',
            options: {
              label: 'LIID VoLTE',
              placeholder: getMessage('phoneExample'),
              labelSpacing: '1',
              requiredMarker: true
            },
            breakpoints: { xs: 12 }
          }
        ]
      : [
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
              label: getMessage('derivationLine'),
              placeholder: getMessage('phoneExample'),
              requiredMarker: true
            }
          }
        ]) as Array<Field<FormValues>>)
  ]

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    number: yup.string().required(getMessage('required')),
    phoneCompany: yup.mixed().required(getMessage('required'))
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        number: initialValues?.number ?? '',
        phoneCompany: initialValues?.phoneCompany ?? '',
        liid: initialValues?.liid ?? '',
        liidVolte: initialValues?.liidVolte ?? '',
        overflowLine: initialValues?.overflowLine ?? null,
        type: initialValues?.type ?? targetType
      },
      validationSchema,
      onSubmit: (values) => {
        onSubmit(Object.assign(values, { type: targetType }))
      },
      enableReinitialize: true
    }),
    [initialValues, targetType]
  )

  return (
    <div>
      <div className="mt-2">
        <Grid spacing={1} className="mb-3">
          <Grid item xs={6}>
            <Radio
              label={getMessage('etsiTargets')}
              value="etsi"
              checked={targetType === 'etsi'}
              onChange={() => setTargetType('etsi')}
            />
          </Grid>
          <Grid item xs={6}>
            <Radio
              label={getMessage('conventionalTargets')}
              value="conventional"
              checked={targetType === 'conventional'}
              onChange={() => setTargetType('conventional')}
            />
          </Grid>
        </Grid>
      </div>
      <Form
        formikConfig={formikConfig}
        fields={fields}
        submitButtonPosition="right"
        submitButtonLabel={getGlobalMessage('save', 'actionsMessages')}
        submitButtonProps={{
          color: 'indigo',
          variant: 'contained',
          className: 'mt-6 mb-2'
        }}
      />
    </div>
  )
}

export default TargetForm
