import { ReactElement, useMemo, useState } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'

import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import Typography from 'components/Typography'
import Grid from 'components/Grid'
import MultiChipSelect from 'components/Form/Selectmultiple/MultiChip'
import { workGroups } from '../mocks'
import Radio from 'components/Form/Radio'
import TextField from 'components/Form/Textfield'
import Button from 'components/Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Target } from 'types/technique'
import CreateTargetDialog from './CreateTargetDialog'
import { techniqueFormMessages } from '../messages'

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
  const getMessage = useFormatMessage(techniqueFormMessages)
  const getGlobalMessage = useGlobalMessage()

  const [selectedGroups, setSelectedGroups] = useState([])
  const [targetsLinked, setTargetsLinked] = useState<Target[]>([])
  const [advanceTimeType, setAdvanceTimeType] =
    useState<AdvanceTimeType>('days')
  const [advanceTime, setAdvanceTime] = useState('')
  const [priority, setPriority] = useState<PriorityType>('urgent')
  const [openTargetForm, setOpenTargetForm] = useState(false)

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'technique-name',
        label: getMessage('name'),
        placeholder: getMessage('namePlaceholder')
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'description',
      options: {
        id: 'techinque-description',
        label: getMessage('description'),
        placeholder: getMessage('groupDescription'),
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
        label: getMessage('date'),
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
                label={getMessage('groups')}
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
            {getMessage('notification')}
          </Typography>

          <Typography variant="body2" className="mb-2">
            {getMessage('notificationTime')}
          </Typography>
          <Grid spacing={1} className="mb-3">
            <Grid item xs={6}>
              <Radio
                label={getMessage('days')}
                value="days"
                checked={advanceTimeType === 'days'}
                onChange={() => setAdvanceTimeType('days')}
              />
              <TextField
                placeholder={getMessage('daysPlaceholder')}
                type="number"
                value={advanceTimeType === 'days' ? advanceTime : ''}
                onChange={(e) => setAdvanceTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Radio
                label={getMessage('hours')}
                value="hours"
                checked={advanceTimeType === 'hours'}
                onChange={() => setAdvanceTimeType('hours')}
              />
              <TextField
                placeholder={getMessage('hoursPlaceholder')}
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
            {getMessage('priority')}
          </Typography>
          <div className="flex mt-2">
            <Radio
              label={getMessage('urgent')}
              value="urgent"
              checked={priority === 'urgent'}
              onChange={() => setPriority('urgent')}
              className="mr-4"
            />
            <Radio
              label={getMessage('high')}
              value="high"
              checked={priority === 'high'}
              onChange={() => setPriority('high')}
              className="mr-4"
            />
            <Radio
              label={getMessage('normal')}
              value="urgent"
              checked={priority === 'medium'}
              onChange={() => setPriority('urgent')}
              className="mr-4"
            />
            <Radio
              label={getMessage('low')}
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
            {getMessage('follow')}
          </Typography>
          <Typography variant="body2" className="mb-2">
            {getMessage('cutSubtitle')}
          </Typography>
        </div>
      ),
      breakpoints: { xs: 12 }
    },
    {
      type: 'select',
      name: 'shift',
      options: {
        label: getMessage('shift'),
        clearable: true,
        placeholder: getMessage('shiftPlaceholder'),
        items: [
          {
            id: 'm',
            label: getMessage('morning')
          },
          {
            id: 'v',
            label: getMessage('evening')
          },
          {
            id: 'n',
            label: getMessage('nightning')
          }
        ],
        textField: 'label',
        valueField: 'id'
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'court',
      options: {
        label: getMessage('court'),
        placeholder: getMessage('courtPlaceholder')
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
            {getMessage('associatedTargets')}
          </Typography>
          <div className="my-2">
            {targetsLinked.map((target, index) => (
              <Typography key={`new-target-${index}`}>
                {target.phone_number}
              </Typography>
            ))}
          </div>
          <Button
            className="!bg-transparent !text-slate-700 !font-medium group"
            onClick={() => setOpenTargetForm(true)}
          >
            <PlusCircleIcon className="group-hover:text-indigo-500 w-5 mr-1" />
            {getMessage('addTargets')}
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
      <CreateTargetDialog
        open={openTargetForm}
        onClose={() => setOpenTargetForm(false)}
        onAccept={(target: Target) => {
          const newTargetLinkedList = [...targetsLinked, target]
          setTargetsLinked(newTargetLinkedList)
          setOpenTargetForm(false)
        }}
      />
    </div>
  )
}

export default TechniqueForm
