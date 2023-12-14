import { ReactElement, useRef, useState } from 'react'
import { FormikConfig, FormikContextType } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import Typography from 'components/Typography'
import Button from 'components/Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Target, Turn } from 'types/technique'
import CreateTargetDialog from './CreateTargetDialog'
import { techniqueFormMessages } from '../messages'
import useSections from 'hooks/useSections'
import { useDidMountEffect } from 'hooks/useDidMountEffect'
import { addDays, format } from 'date-fns'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import { simpleText } from 'utils/patterns'

type PriorityType = 'urgent' | 'high' | 'medium' | 'low'

export interface FormValues {
  name: string
  description: string
  startDate: Date | null
  endDate: Date | null
  groups: any[]
  shift: string
  court: string
  priority: PriorityType
  notificationDays: string
  notificationHours: string
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
  const ability = useAbility()

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
      type: 'date',
      name: 'startDate',
      options: {
        label: getMessage('startDate'),
        formatDisplay: 'dd/MM/yyyy',
        minDate: format(new Date(), 'yyyy-MM-dd'),
        requiredMarker: true,
        disabled: true
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'date',
      name: 'endDate',
      options: {
        label: getMessage('endDate'),
        formatDisplay: 'dd/MM/yyyy',
        minDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
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
        noOptionsMessage: () => getMessage('noGroupsFound'),
        disabled: ability.cannot(ACTION.READ, SUBJECT.GROUPS)
      }
    },
    {
      name: 'notificationDays',
      type: 'select',
      options: {
        label: getMessage('days'),
        clearable: false,
        items: Array.from(Array(31), (_, idx) => ({ day: idx.toString() })),
        textField: 'day',
        valueField: 'day'
      },
      breakpoints: { xs: 6 },
      section: 'notification'
    },
    {
      name: 'notificationHours',
      type: 'select',
      options: {
        label: getMessage('hours'),
        clearable: false,
        items: Array.from(Array(24), (_, idx) => ({ hour: idx.toString() })),
        textField: 'hour',
        valueField: 'hour'
      },
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
            id: Turn.MORNING,
            label: getMessage('morning')
          },
          {
            id: Turn.EVENING,
            label: getMessage('afternoon')
          },
          {
            id: Turn.NIGHTNING,
            label: getMessage('night')
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
            disabled={ability.cannot(ACTION.READ, SUBJECT.CARRIERS)}
          >
            <PlusCircleIcon className="group-hover:enabled:text-indigo-500 w-5 mr-1" />
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
    name: yup
      .string()
      .required(getMessage('required'))
      .matches(simpleText, getMessage('invalidSimpleText')),
    description: yup
      .string()
      .required(getMessage('required'))
      .matches(simpleText, getMessage('invalidSimpleText')),
    endDate: yup.mixed().required(getMessage('required'))
  })

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: {
      name: initialValues?.name ?? '',
      description: initialValues?.description ?? '',
      startDate: initialValues?.startDate ?? new Date(),
      endDate: initialValues?.endDate ?? null,
      court: initialValues?.court ?? '',
      shift: initialValues?.shift ?? '',
      groups: initialValues?.groups ?? [],
      notificationDays: initialValues?.notificationDays ?? '0',
      notificationHours: initialValues?.notificationHours ?? '0',
      priority: initialValues?.priority ?? 'medium',
      targets: initialValues?.targets ?? []
    },
    validationSchema,
    onSubmit
  }

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
        onAccept={async (target) => {
          const newTarget: Target = {
            name: target.name,
            phone_company: target.phoneCompany?.value,
            phone_number: target.number,
            liid: target.liid,
            liid_v: target.liidVolte,
            overflow_id: target.overflowLine?.value,
            type: target.type
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
