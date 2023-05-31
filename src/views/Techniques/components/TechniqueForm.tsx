import { ReactElement, useMemo, useRef, useState } from 'react'
import { FormikConfig, FormikContextType } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import Typography from 'components/Typography'
import TextField from 'components/Form/Textfield'
import Button from 'components/Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Target } from 'types/technique'
import CreateTargetDialog from './CreateTargetDialog'
import { techniqueFormMessages } from '../messages'
import useSections from 'hooks/useSections'
import { useDidMountEffect } from 'hooks/useDidMountEffect'

type AdvanceTimeType = 'days' | 'hours'
type PriorityType = 'urgent' | 'high' | 'medium' | 'low'

export interface FormValues {
  name: string
  description: string
  dates: Date[]
  groups: any[]
  shift: string
  court: string
  advanceTimeType: AdvanceTimeType
  priority: PriorityType
  advanceTime: string
  targets: Target[]
}

interface Props {
  initialValues?: FormValues
  onSubmit: (values: FormValues) => Promise<void>
  open: boolean
}

const TechniqueForm = ({
  initialValues,
  onSubmit,
  open
}: Props): ReactElement => {
  const getMessage = useFormatMessage(techniqueFormMessages)
  const getGlobalMessage = useGlobalMessage()
  const [openTargetForm, setOpenTargetForm] = useState(false)
  const formikRef = useRef<FormikContextType<FormValues>>()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'technique-name',
        label: getMessage('name'),
        placeholder: getMessage('namePlaceholder'),
        requiredMarker: true
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
        rows: 4,
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'date-range',
      name: 'dates',
      options: {
        id: 'techinque-date-start-end',
        label: getMessage('date'),
        formatDisplay: 'dd/MM/yyyy',
        minDate: new Date().toISOString(),
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'async-select',
      name: 'groups',
      options: {
        asyncProps: {
          api: {
            endpoint: 'groups',
            method: 'get'
          },
          value: 'id',
          label: 'name',
          searchField: 'name'
        },
        debounceTimeout: 300,
        label: getMessage('groups'),
        isMulti: true,
        placeholder: `${getMessage('search')}...`,
        loadingMessage: () => getMessage('loadingGroups'),
        noOptionsMessage: () => getMessage('noGroupsFound')
      }
    },
    {
      name: 'advanceTimeType',
      type: 'radio',
      options: {
        label: getMessage('days'),
        value: 'days'
      },
      breakpoints: {
        xs: 6
      },
      section: 'notification'
    },
    {
      name: 'advanceTimeType',
      type: 'radio',
      options: {
        label: getMessage('hours'),
        value: 'hours'
      },
      breakpoints: {
        xs: 6
      },
      section: 'notification'
    },
    {
      name: 'advanceTime',
      type: 'custom',
      children: ({ name, setFieldValue, values, errors, touched }) => (
        <TextField
          value={values.advanceTimeType === 'days' ? values[name] : ''}
          disabled={values.advanceTimeType !== 'days'}
          placeholder={getMessage('daysPlaceholder')}
          onChange={(e) => setFieldValue(name, e.target.value)}
          error={Boolean(errors[name] && touched[name])}
          helperText={errors[name] && touched[name] ? errors[name] : ''}
        />
      ),
      breakpoints: { xs: 6 },
      section: 'notification'
    },
    {
      name: 'advanceTime',
      type: 'custom',
      children: ({ name, setFieldValue, values, errors, touched }) => (
        <TextField
          value={values.advanceTimeType === 'hours' ? values[name] : ''}
          disabled={values.advanceTimeType !== 'hours'}
          placeholder={getMessage('hoursPlaceholder')}
          onChange={(e) => setFieldValue(name, e.target.value)}
          error={Boolean(errors[name] && touched[name])}
          helperText={errors[name] && touched[name] ? errors[name] : ''}
        />
      ),
      breakpoints: { xs: 6 },
      section: 'notification'
    },
    {
      name: 'priority',
      type: 'radio',
      options: {
        label: getMessage('urgent'),
        value: 'urgent'
      },
      breakpoints: { xs: 12, md: 3 },
      section: 'priority'
    },
    {
      name: 'priority',
      type: 'radio',
      options: {
        label: getMessage('high'),
        value: 'high'
      },
      breakpoints: { xs: 12, md: 3 },
      section: 'priority'
    },
    {
      name: 'priority',
      type: 'radio',
      options: {
        label: getMessage('medium'),
        value: 'medium'
      },
      breakpoints: { xs: 12, md: 3 },
      section: 'priority'
    },
    {
      name: 'priority',
      type: 'radio',
      options: {
        label: getMessage('low'),
        value: 'low'
      },
      breakpoints: { xs: 12, md: 3 },
      section: 'priority'
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
      breakpoints: { xs: 12, md: 6 },
      section: 'follow'
    },
    {
      type: 'text',
      name: 'court',
      options: {
        label: getMessage('court'),
        placeholder: getMessage('courtPlaceholder'),
        labelSpacing: '1'
      },
      breakpoints: { xs: 12, md: 6 },
      section: 'follow'
    },
    {
      type: 'custom',
      name: 'targets',
      children: ({ values, name }) => (
        <div className="mt-2">
          <div className="my-2">
            {values[name].map((target, index) => (
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
      breakpoints: { xs: 12 },
      section: 'targets'
    }
  ]

  const sections = useSections(() => [
    {
      name: 'notification',
      title: {
        text: getMessage('notification'),
        style: 'medium',
        variant: 'body2',
        className: 'uppercase text-primary-500'
      },
      description: {
        text: getMessage('notificationTime'),
        variant: 'body2',
        className: 'text-secondary'
      },
      spacing: 2
    },
    {
      name: 'priority',
      title: {
        text: getMessage('priority'),
        style: 'medium',
        variant: 'body2',
        className: 'uppercase text-primary-500'
      }
    },
    {
      name: 'follow',
      title: {
        text: getMessage('follow'),
        style: 'medium',
        variant: 'body2',
        className: 'uppercase text-primary-500'
      },
      description: {
        text: getMessage('cutSubtitle'),
        variant: 'body2',
        className: 'text-secondary'
      },
      spacing: 2
    },
    {
      name: 'targets',
      title: {
        text: getMessage('associatedTargets'),
        style: 'medium',
        variant: 'body2',
        className: 'uppercase text-primary-500'
      }
    }
  ])

  useDidMountEffect(() => {
    if (!open) {
      setTimeout(() => {
        formikRef.current?.resetForm()
      }, 100)
    }
  }, [open])

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
        shift: initialValues?.shift ?? '',
        groups: initialValues?.groups ?? [],
        advanceTimeType: initialValues?.advanceTimeType ?? 'days',
        advanceTime: initialValues?.advanceTime ?? '',
        priority: initialValues?.priority ?? 'medium',
        targets: initialValues?.targets ?? []
      },
      validationSchema,
      onSubmit
    }),
    [initialValues]
  )

  return (
    <div>
      <Form
        formikConfig={formikConfig}
        formikRef={formikRef}
        fields={fields}
        submitButtonPosition="right"
        submitButtonLabel={getGlobalMessage('save', 'actionsMessages')}
        submitButtonProps={{
          color: 'indigo',
          variant: 'contained',
          className: 'mt-6 mb-2'
        }}
        withSections={{
          sections,
          renderMainSection: true
        }}
      />
      <CreateTargetDialog
        open={openTargetForm}
        onClose={() => setOpenTargetForm(false)}
        onAccept={(target) => {
          const newTarget: Target = {
            name: target.name,
            phone_company: target.phoneCompany,
            phone_number: target.number
          }

          formikRef.current?.setFieldValue(
            'targets',
            formikRef.current.values.targets.concat([newTarget])
          )
          setOpenTargetForm(false)
        }}
      />
    </div>
  )
}

export default TechniqueForm
