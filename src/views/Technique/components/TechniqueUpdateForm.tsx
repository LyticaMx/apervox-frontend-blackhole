import {
  MutableRefObject,
  ReactElement,
  useEffect,
  useMemo,
  useState
} from 'react'
import { FormikConfig, FormikContextType } from 'formik'
import * as yup from 'yup'

import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'

import Form from 'components/Form'
import TextField from 'components/Form/Textfield'

import { techniqueFormMessages } from '../messages'
import { Turn } from 'types/technique'
import { addDays, format, set } from 'date-fns'
import { useTechnique } from 'context/Technique'
import useSections from 'hooks/useSections'
import useToast from 'hooks/useToast'
import { Priority } from 'types/priority'
import { useTechniques } from 'context/Techniques'
import ConfirmationDialog from './ConfirmationDialog'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import StaticTargetDialog from './StaticTargetsDialog'

type AdvanceTimeType = 'days' | 'hours'
type PriorityType = 'urgent' | 'high' | 'medium' | 'low'

export interface FormValues {
  name: string
  description: string
  startDate: Date | null
  endDate: Date | null
  groups: any[]
  shift: string
  court: string
  advanceTimeType: AdvanceTimeType
  priority: PriorityType
  advanceTime: string
}

interface Props {
  formikRef: MutableRefObject<FormikContextType<FormValues> | undefined>
}

const TechniqueUpdateForm = ({ formikRef }: Props): ReactElement => {
  const { technique, actions: techniqueActions } = useTechnique()
  const { actions: techniquesActions } = useTechniques()
  const getMessage = useFormatMessage(techniqueFormMessages)
  const getGlobalMessage = useGlobalMessage()
  const { launchToast } = useToast()
  const [waitForExtension, setWaitForExtension] = useState<
    ((value: PromiseLike<string[] | null> | (string[] | null)) => void) | null
  >(null)
  const [waitForAnticipation, setWaitForAnticipation] = useState<
    ((value: PromiseLike<boolean> | boolean) => void) | null
  >(null)

  useEffect(() => {
    techniqueActions?.get()
  }, [])

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
        clearable: false,
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
        labelSpacing: '1',
        placeholder: getMessage('courtPlaceholder')
      },
      breakpoints: { xs: 6 },
      section: 'follow'
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
    }
  ])

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required'))
  })

  const handleFormSubmit = async (values: FormValues): Promise<void> => {
    if (!values.endDate) return

    const expiresAt = set(values.endDate, {
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999
    })

    const oldExpiration = new Date(technique?.expires_at ?? 0)

    let staticDateTargets: string[] | undefined

    if (expiresAt > oldExpiration) {
      // TODO: Aqui agregar tabla de objetivos con nueva fecha
      const isAnyLinkedTarget =
        (await techniqueActions?.hasLinkedDateTargets()) ?? false

      if (isAnyLinkedTarget) {
        const targets = await new Promise<string[] | null>((resolve) => {
          setWaitForExtension(() => resolve)
        })

        setWaitForExtension(null)

        if (!targets) {
          launchToast({
            type: 'Warning',
            title: 'No se realizó la actualización'
          })
          return
        }
        staticDateTargets = targets
      }
    } else if (expiresAt < oldExpiration) {
      const aprove = await new Promise<boolean>((resolve) => {
        setWaitForAnticipation(() => resolve)
      })

      setWaitForAnticipation(null)

      if (!aprove) {
        launchToast({
          type: 'Warning',
          title: 'No se realizó la actualización'
        })
        return
      }
    }

    const updated = await techniqueActions?.update(
      {
        name: values.name,
        expires_at: expiresAt.toISOString(),
        priority: values.priority as Priority,
        shift: values.shift as Turn,
        reportEvidenceEvery: values.court,
        notificationTime: parseInt(values.advanceTime),
        notificationTimeUnit: values.advanceTimeType,
        groups: values.groups.map((item) => item.value)
      },
      staticDateTargets
    )
    if (updated) {
      launchToast({
        title: 'Datos actualizados',
        type: 'Success'
      })
      await techniquesActions?.get()
    }
  }

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: technique?.name ?? '',
        description: technique?.description ?? '',
        startDate: technique?.created_at
          ? new Date(technique.created_at)
          : new Date(),
        endDate: technique?.expires_at
          ? new Date(technique.expires_at)
          : new Date(),
        court: technique?.reportEvidenceEvery ?? '',
        shift: technique?.attention_turn ?? '',
        groups:
          technique?.groups?.map((item) => ({
            label: item.name,
            value: item.id
          })) ?? [],
        advanceTimeType: technique?.notificationTimeUnit ?? 'days',
        advanceTime: technique?.notificationTime?.toString() ?? '',
        priority: technique?.priority ?? 'medium'
      },
      validationSchema,
      onSubmit: handleFormSubmit,
      enableReinitialize: true
    }),
    [technique, handleFormSubmit]
  )

  return (
    <div>
      <ConfirmationDialog
        icon={<ExclamationCircleIcon className="text-red-500 w-5 h-5" />}
        title="Anticipar técnica."
        body="Los objetivos sin fecha de finalización definida o con fecha posterior a la nueva fecha se limitarán a esta última. ¿Desea continuar?"
        onAction={waitForAnticipation}
        startDate={technique?.expires_at}
        endDate={formikRef.current?.values.endDate?.toISOString()}
      />
      <StaticTargetDialog
        onAction={waitForExtension}
        startDate={technique?.expires_at}
        endDate={formikRef.current?.values.endDate?.toISOString()}
      />
      <Form
        formikConfig={formikConfig}
        formikRef={formikRef}
        fields={fields}
        withSections={{ sections, renderMainSection: true }}
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

export default TechniqueUpdateForm
