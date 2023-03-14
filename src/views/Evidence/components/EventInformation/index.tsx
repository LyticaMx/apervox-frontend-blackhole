import { CalendarDaysIcon, CheckIcon } from '@heroicons/react/24/outline'
import Form from 'components/Form'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import { useLanguage } from 'context/Language'
import { FormikConfig, FormikContextType } from 'formik'
import { formMessages, generalMessages, platformMessages } from 'globalMessages'
import { MutableRefObject, ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field, Section } from 'types/form'
import { eventInformationMessages } from '../../messages'
import StarRating from './StarRating'
import * as yup from 'yup'
import { format } from 'date-fns'
import { secondsToString } from 'utils/timeToString'

export interface FormValues {
  label: string
  classification: '0' | '1' | '2' | '3'
  follow: boolean
}

export interface EvidenceData {
  id: string
  tiName: string
  targetPhone?: string
  filename?: string
  sourceDevice?: string
  startDate: string
  endDate?: string
  duration?: number
}

interface Props {
  formikRef: MutableRefObject<FormikContextType<FormValues> | undefined>
  onSubmit:
    | ((values: FormValues) => void)
    | ((values: FormValues) => Promise<void>)
    | ((values: FormValues) => Promise<boolean>)
  evidenceData: EvidenceData
}

const EventInformation = (props: Props): ReactElement => {
  const { formikRef, onSubmit, evidenceData } = props
  const { formatMessage } = useIntl()
  const { localeI18n } = useLanguage()

  const validationSchema = yup.object({
    classification: yup
      .number()
      .typeError(formatMessage(formMessages.mustBeNumber))
      .min(1, formatMessage(formMessages.required))
  })

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: {
      label: '',
      classification: '0',
      follow: false
    },
    onSubmit: async (values) => {
      await onSubmit(values)
    },
    validationSchema
  }

  const fields = useMemo<Array<Field<FormValues>>>(
    () => [
      {
        type: 'text',
        name: 'label',
        options: {
          id: 'text',
          label: formatMessage(generalMessages.label),
          labelSpacing: '1',
          labelClassname: 'italic text-base font-normal'
        },
        section: 'label'
      },
      {
        type: 'custom',
        name: 'classification',
        children: StarRating,
        section: 'classification'
      },
      {
        type: 'switch',
        name: 'follow',
        options: {
          color: 'primary',
          label: formatMessage(eventInformationMessages.followingEvidence),
          size: 'sm'
        },
        section: 'follow'
      }
    ],
    [localeI18n]
  )

  const sections = useMemo<Section[]>(
    () => [
      {
        name: 'label',
        title: {
          text: formatMessage(eventInformationMessages.eventLabel),
          className: 'uppercase text-primary',
          style: 'medium',
          variant: 'body1'
        },
        description: {
          text: formatMessage(eventInformationMessages.configureEventLabel),
          className: 'text-secondary'
        }
      },
      {
        name: 'classification',
        title: {
          text: formatMessage(generalMessages.clasification),
          className: 'uppercase text-primary mt-6',
          style: 'medium',
          variant: 'body1'
        },
        description: {
          text: formatMessage(eventInformationMessages.establishClassification),
          className: 'text-secondary'
        },
        removeSeparator: true
      },
      {
        name: 'follow',
        title: {
          text: formatMessage(generalMessages.follow),
          className: 'uppercase text-primary mt-6',
          style: 'medium',
          variant: 'body1'
        },
        removeSeparator: true
      }
    ],
    [localeI18n]
  )

  return (
    // min-w-[256px] max-w-[355px] fixed top-20 right-0 bottom-0 overflow-y-auto <- Estas clases pueden servir si lo quieren estatico
    <aside className="bg-[#f6f6f6] rounded-l-md shadow-md px-4 py-2">
      <Typography
        variant="title"
        className="font-[900] uppercase text-secondary"
      >
        {formatMessage(eventInformationMessages.eventInformation)}
      </Typography>
      <Typography>
        {formatMessage(eventInformationMessages.eventData)}
      </Typography>
      <Typography style="italic">
        {formatMessage(eventInformationMessages.evidenceId)}
      </Typography>
      <Typography className="ml-4">{evidenceData.id}</Typography>
      {evidenceData.filename && (
        <>
          <Typography style="italic">
            {formatMessage(eventInformationMessages.filename)}
          </Typography>
          <Typography className="ml-4">{evidenceData.filename}</Typography>
        </>
      )}

      <Typography style="italic">
        {formatMessage(eventInformationMessages.tiName)}
      </Typography>
      <Typography className="ml-4">{evidenceData.tiName}</Typography>
      {evidenceData.targetPhone && (
        <>
          <Typography style="italic">
            {formatMessage(eventInformationMessages.targetPhone)}
          </Typography>
          <Typography className="ml-4">{evidenceData.targetPhone}</Typography>
        </>
      )}
      <Typography style="italic">
        {formatMessage(eventInformationMessages.sourceDevice)}
      </Typography>
      <Typography className="ml-4">Laptop forense</Typography>
      <Grid>
        <Grid item xs={6}>
          <Typography style="italic">
            {formatMessage(platformMessages.startHour)}
          </Typography>
          <div className="flex gap-2 items-center">
            <CheckIcon className="w-4 h-4 text-primary" />
            <span>{format(new Date(evidenceData.startDate), 'HH:mm')}</span>
          </div>
        </Grid>
        {evidenceData.endDate && (
          <Grid item xs={6}>
            <Typography style="italic">
              {formatMessage(platformMessages.endHour)}
            </Typography>
            <div className="flex gap-2 items-center">
              <CheckIcon className="w-4 h-4 text-primary" />
              <span>{format(new Date(evidenceData.endDate), 'HH:mm')}</span>
            </div>
          </Grid>
        )}
      </Grid>
      <Typography style="italic">
        {formatMessage(platformMessages.eventDate)}
      </Typography>
      <div className="flex items-center gap-2">
        <CalendarDaysIcon className="text-gray-400 w-4 h-4" />
        <Typography>
          {format(new Date(evidenceData.startDate), 'dd/MM/yyyy')}
        </Typography>
      </div>
      {evidenceData.duration && (
        <>
          <Typography style="italic">
            {formatMessage(generalMessages.duration)}
          </Typography>
          <Typography className="ml-4">
            {secondsToString(evidenceData.duration)}
          </Typography>
        </>
      )}
      <Form
        formikConfig={formikConfig}
        fields={fields}
        withSections={{
          sections
        }}
        renderSubmitButton={false}
        formikRef={formikRef}
        className="my-3"
      />
    </aside>
  )
}

export default EventInformation
