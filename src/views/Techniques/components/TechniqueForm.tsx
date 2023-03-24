import { ReactElement, useMemo, useState } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'

import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { formMessages } from 'globalMessages'
import Typography from 'components/Typography'
import Grid from 'components/Grid'
import MultiChipSelect from 'components/Form/Selectmultiple/MultiChip'
import { workGroups } from '../mocks'
import Radio from 'components/Form/Radio'
import TextField from 'components/Form/Textfield'
import Button from 'components/Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Objective } from 'types/technique'
import CreateObjectiveDialog from './CreateObjectiveDialog'

type AdvanceTimeType = 'days' | 'hours'
type PriorityType = 'urgent' | 'high' | 'medium' | 'low'

interface FormValues {
  name: string
  description: string
  dates: Date[]
  shift: string
  court: string
}

interface Props {
  initialValues?: FormValues
  onSubmit: (values: FormValues) => Promise<void>
}

const TechniqueForm = ({ initialValues, onSubmit }: Props): ReactElement => {
  const getMessage = useFormatMessage(formMessages)
  const getGlobalMessage = useGlobalMessage()

  const [selectedGroups, setSelectedGroups] = useState([])
  const [objectivesLinked, setObjectivesLinked] = useState<Objective[]>([])
  const [advanceTimeType, setAdvanceTimeType] =
    useState<AdvanceTimeType>('days')
  const [advanceTime, setAdvanceTime] = useState('')
  const [priority, setPriority] = useState<PriorityType>('urgent')
  const [openObjectiveForm, setOpenObjectiveForm] = useState(false)

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'technique-name',
        label: 'Nombre de la técnica',
        placeholder: 'Ej. T.I.000/2022-0'
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'description',
      options: {
        id: 'techinque-description',
        label: getMessage('description'),
        placeholder: 'Escribe aquí la descripción del grupo.',
        multiline: true,
        rows: 4
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'date-range',
      name: 'dates',
      options: {
        id: 'techinque-date-start-end',
        label: 'Fecha de incio y finalización',
        formatDisplay: 'dd/mm/yyyy'
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'custom',
      name: 'groups',
      children: (
        <div className="mt-2">
          <Grid spacing={1} className="mb-3">
            <Grid item xs={12}>
              <MultiChipSelect
                label="Grupos"
                selected={selectedGroups}
                onChange={setSelectedGroups}
                items={workGroups}
                textField="name"
                valueField="id"
                chipProps={{
                  variant: 'caption',
                  className: 'bg-primary-50'
                }}
              />
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            style="medium"
            className="uppercase text-primary-500"
          >
            Notificaciones de caducidad
          </Typography>

          <Typography variant="body2" className="mb-2">
            Configura el tiempo de antelación en dias u horas
          </Typography>
          <Grid spacing={1} className="mb-3">
            <Grid item xs={6}>
              <Radio
                label="Dias"
                value="days"
                checked={advanceTimeType === 'days'}
                onChange={() => setAdvanceTimeType('days')}
              />
              <TextField
                placeholder="Ej.3 dias"
                type="number"
                value={advanceTimeType === 'days' ? advanceTime : ''}
                onChange={(e) => setAdvanceTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Radio
                label="Horas"
                value="hours"
                checked={advanceTimeType === 'hours'}
                onChange={() => setAdvanceTimeType('hours')}
              />
              <TextField
                placeholder="Ej.3 horas"
                type="number"
                value={advanceTimeType === 'hours' ? advanceTime : ''}
                onChange={(e) => setAdvanceTime(e.target.value)}
              />
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            style="medium"
            className="uppercase text-primary-500"
          >
            Prioridad
          </Typography>
          <div className="flex mt-2">
            <Radio
              label="Urgente"
              value="urgent"
              checked={priority === 'urgent'}
              onChange={() => setPriority('urgent')}
              className="mr-4"
            />
            <Radio
              label="Alta"
              value="high"
              checked={priority === 'high'}
              onChange={() => setPriority('high')}
              className="mr-4"
            />
            <Radio
              label="Media"
              value="urgent"
              checked={priority === 'medium'}
              onChange={() => setPriority('urgent')}
              className="mr-4"
            />
            <Radio
              label="Baja"
              value="low"
              checked={priority === 'low'}
              onChange={() => setPriority('low')}
            />
          </div>
          <Typography
            variant="body2"
            style="medium"
            className="uppercase text-primary-500 mt-2"
          >
            Seguimiento
          </Typography>
          <Typography variant="body2" className="mb-2">
            Establece si la técnica debe enviarse a ciertos turnos de trabajo o
            cortes
          </Typography>
        </div>
      ),
      breakpoints: { xs: 12 }
    },
    {
      type: 'select',
      name: 'shift',
      options: {
        label: 'Turno',
        clearable: true,
        placeholder: 'Ej.Matutino',
        items: [
          {
            id: 'm',
            label: 'Matutino'
          },
          {
            id: 'v',
            label: 'Vespertino'
          }
        ],
        textField: 'label',
        valueField: 'id'
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'select',
      name: 'court',
      options: {
        label: 'Corte',
        clearable: true,
        placeholder: 'Ej.001',
        items: [
          {
            id: '001',
            label: '001'
          },
          {
            id: '002',
            label: '002'
          }
        ],
        textField: 'label',
        valueField: 'id'
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'custom',
      name: 'groups',
      children: (
        <div className="mt-2">
          <Typography
            variant="body2"
            style="medium"
            className="uppercase text-primary-500 mt-2"
          >
            Seguimiento
          </Typography>
          <Typography variant="body2" className="mb-2">
            Establece si la técnica debe enviarse a ciertos turnos de trabajo o
            cortes
          </Typography>
          <div className="my-2">
            {objectivesLinked.map((objective, index) => (
              <Typography key={`new-objective-${index}`}>
                {objective.phone_number}
              </Typography>
            ))}
          </div>
          <Button
            className="!bg-transparent !text-slate-700 !font-medium group"
            onClick={() => setOpenObjectiveForm(true)}
          >
            <PlusCircleIcon className="group-hover:text-indigo-500 w-5 mr-1" />
            Agregar objetivos
          </Button>
        </div>
      ),
      breakpoints: { xs: 12 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    description: yup.string().required(getMessage('required'))
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        description: initialValues?.description ?? '',
        dates: initialValues?.dates ?? [],
        court: initialValues?.court ?? '',
        shift: initialValues?.shift ?? ''
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
      <CreateObjectiveDialog
        open={openObjectiveForm}
        onClose={() => setOpenObjectiveForm(false)}
        onAccept={(objective: Objective) => {
          const newObjectiveLinkedList = [...objectivesLinked, objective]
          setObjectivesLinked(newObjectiveLinkedList)
          setOpenObjectiveForm(false)
        }}
      />
    </div>
  )
}

export default TechniqueForm
