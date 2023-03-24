import { ReactElement, useMemo, useState } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'

import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { formMessages } from 'globalMessages'
import Grid from 'components/Grid'
import Radio from 'components/Form/Radio'
import SelectField from 'components/Form/Select'
import TextField from 'components/Form/Textfield'
import Switch from 'components/Form/Switch'
import Datepicker from 'components/Form/Datepicker'
import Typography from 'components/Typography'
import { useToggle } from 'usehooks-ts'

type ObjectiveType = 'etsi' | 'conventional'

interface FormValues {
  name: string
  number: string
  phoneCompany: string
}

interface Props {
  initialValues?: FormValues
  onSubmit: (values: FormValues) => Promise<void>
}

const ObjectiveForm = ({ initialValues, onSubmit }: Props): ReactElement => {
  const getMessage = useFormatMessage(formMessages)
  const getGlobalMessage = useGlobalMessage()
  const [state, toggle] = useToggle(false)

  const [objectiveType, setObjectiveType] = useState<ObjectiveType>('etsi')
  const [derivationLine, setDerivationLine] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [etsiLiid, setEtsiLiid] = useState({
    base: '',
    volte: ''
  })

  const handleChangeEtsiValues = (name: string, newValue: string): void => {
    setEtsiLiid((prev) => ({ ...prev, [name]: newValue }))
  }

  const fields: Array<Field<FormValues>> = [
    {
      type: 'custom',
      name: 'groups',
      children: (
        <div className="mt-2">
          <Grid spacing={1} className="mb-3">
            <Grid item xs={6}>
              <Radio
                label="Objetivos ETSI"
                value="etsi"
                checked={objectiveType === 'etsi'}
                onChange={() => setObjectiveType('etsi')}
              />
            </Grid>
            <Grid item xs={6}>
              <Radio
                label="Objetivos convencionales"
                value="conventional"
                checked={objectiveType === 'conventional'}
                onChange={() => setObjectiveType('conventional')}
              />
            </Grid>
          </Grid>
        </div>
      ),
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'objective-name',
        label: 'Alias / Nombre del objetivo',
        placeholder: 'Ej. El chapo',
        labelSpacing: '1'
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'number',
      options: {
        id: 'objective-number',
        label: 'Número del objetivo',
        placeholder: 'Ej. numero a 10 dígitos',
        labelSpacing: '1'
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'custom',
      name: 'endDate',
      children: (
        <div className="mt-2">
          <div className="flex items-center">
            <Switch onChange={toggle} value={state} color="indigo" />
            <Typography className="ml-2 uppercase text-indigo-500 font-semibold">
              Fecha de finalización
            </Typography>
          </div>
          <Typography className="leading-tight mb-2">
            Si habilitas este campo deberás ingresar una fecha de finalización
            diferente y anterior a la fecha de vigencia de la técnica.
          </Typography>
          <Datepicker onChange={(value) => setEndDate(value)} value={endDate} />
        </div>
      ),
      breakpoints: { xs: 12 }
    },
    {
      type: 'select',
      name: 'phoneCompany',
      options: {
        label: 'Compañia telefonica',
        items: [
          { id: '01', name: 'Telcel' },
          { id: '02', name: 'AT&T' },
          { id: '03', name: 'Movi' }
        ],
        clearable: true,
        valueField: 'id',
        textField: 'name'
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'custom',
      name: 'objectiveTypeValues',
      children: (
        <div className="mt-2">
          {objectiveType === 'etsi' ? (
            <div className="w-full">
              <TextField
                label="LIID"
                placeholder="Ej. 00000000"
                value={etsiLiid.base}
                labelSpacing="1"
                onChange={(e) => {
                  handleChangeEtsiValues('base', e.target.value)
                }}
              />
              <TextField
                className="mt-2"
                label="LIID VoLTE"
                placeholder="Ej. 00000000"
                value={etsiLiid.volte}
                labelSpacing="1"
                onChange={(e) => {
                  handleChangeEtsiValues('volte', e.target.value)
                }}
              />
            </div>
          ) : (
            <div className="w-full">
              <SelectField
                className="w-full"
                label="Linea de derivación"
                placeholder="Ej. 5500000000"
                items={[
                  {
                    id: 'line_001',
                    name: '5539454356'
                  }
                ]}
                textField="name"
                valueField="id"
                value={derivationLine}
                onChange={(valueSelected) => setDerivationLine(valueSelected)}
              />
            </div>
          )}
        </div>
      ),
      breakpoints: { xs: 12 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    number: yup.string().required(getMessage('required')),
    phoneCompany: yup.string().required(getMessage('required'))
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        number: initialValues?.number ?? '',
        phoneCompany: initialValues?.phoneCompany ?? ''
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values)

        onSubmit(values)
      }
    }),
    [initialValues]
  )

  return (
    <div>
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

export default ObjectiveForm
