import { MexicoFlag, UsaFlag } from 'assets/SVG'
import Button from 'components/Button'
import Radio from 'components/Form/Radio'
import Switch from 'components/Form/Switch'
import TextField from 'components/Form/Textfield'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import { useFormik } from 'formik'
import {
  actionsMessages,
  formMessages,
  generalMessages,
  timeMessages
} from 'globalMessages'
import { ReactElement, useEffect } from 'react'
import { useIntl } from 'react-intl'
import NavOptions from './components/NavOptions'
import { messages } from './messages'
import * as yup from 'yup'
import LabelsAdministration from './components/LabelsAdministration'
import LetterheadAdministration from './components/LetterheadAdministration'
import SelectField from 'components/Form/Select'
import { useSettings } from 'context/Settings'
import useToast from 'hooks/useToast'
import { useLanguage } from 'context/Language'
import { LocaleType } from 'types/language'
import { getItem } from 'utils/persistentStorage'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'

interface FormValues {
  language: LocaleType
  dataEvidence: 'simple' | 'full'
  url: string
  doubleStepDelete: boolean
  inactivityTime: number
  openSessions: number
}

const GeneralConfig = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { settings, actions: settingsActions } = useSettings()
  const { actions: auditActions } = useModuleAudits()
  const toast = useToast()
  const { actions: languageActions } = useLanguage()

  useEffect(() => {
    settingsActions?.get()
    auditActions?.genAudit(ModuleAuditsTypes.AuditableModules.SETTINGS)
  }, [])

  const validationSchema = yup.object({
    url: yup.string().required(formatMessage(formMessages.required)),

    inactivityTime: yup
      .number()
      .typeError(formatMessage(formMessages.mustBeNumber))
      .required(formatMessage(formMessages.required))
      .min(
        1,
        formatMessage(formMessages.minValue, {
          value: `1 ${formatMessage(timeMessages.minute).toLowerCase()}`
        })
      ),
    openSessions: yup
      .number()
      .typeError(formatMessage(formMessages.mustBeNumber))
      .required(formatMessage(formMessages.required))
      .min(1, formatMessage(formMessages.minValue, { value: 1 }))
  })

  const formik = useFormik<FormValues>({
    initialValues: {
      language: getItem('lang') ?? 'es',
      dataEvidence: settings.fullEvidenceView ? 'full' : 'simple',
      doubleStepDelete: settings.doubleValidation,
      openSessions: settings.concurrentSessions,
      inactivityTime: settings.inactivityTime,
      url: settings.downloadPath
    },
    onSubmit: async (values) => {
      languageActions?.changeLocale(values.language)

      const updated = await settingsActions?.update({
        concurrentSessions: values.openSessions,
        doubleValidation: values.doubleStepDelete,
        downloadPath: values.url,
        fullEvidenceView: values.dataEvidence === 'full',
        inactivityTime: values.inactivityTime
      })
      if (!updated) return // TODO: revisar cuando falle si es necesario un toast

      toast.success(formatMessage(messages.updatedSuccessfully))
    },
    enableReinitialize: true,
    validationSchema
  })

  return (
    <div>
      <NavOptions />
      <Typography
        variant="title"
        className="text-secondary font-[900] uppercase"
      >
        {formatMessage(messages.title)}
      </Typography>
      <Typography>{formatMessage(messages.generalPreferences)}</Typography>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Grid spacing={3}>
          <Grid
            item
            xs={12}
            md={4}
            className="bg-white rounded-md px-6 py-4 shadow-md h-40"
          >
            <Typography className="uppercase text-secondary" style="medium">
              {formatMessage(generalMessages.language)}
            </Typography>
            <div className="mt-2 flex justify-around">
              <div className="flex gap-1 items-center">
                <Radio
                  label=""
                  value="es"
                  onBlur={formik.handleBlur}
                  checked={formik.values.language === 'es'}
                  onChange={formik.handleChange}
                  name="language"
                />
                <MexicoFlag />
                <Typography variant="body1">
                  {formatMessage(generalMessages.spanish)}
                </Typography>
              </div>
              <div className="flex gap-1 items-center">
                <Radio
                  label=""
                  value="en"
                  onBlur={formik.handleBlur}
                  checked={formik.values.language === 'en'}
                  onChange={formik.handleChange}
                  name="language"
                />
                <UsaFlag />
                <Typography variant="body1">
                  {formatMessage(generalMessages.english)}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="bg-white rounded-md px-6 py-4 shadow-md h-40"
          >
            <Typography className="uppercase text-secondary" style="medium">
              {formatMessage(messages.audioEvidences)}
            </Typography>
            <Typography>
              {formatMessage(messages.selectAudioEvidenceViewType)}
            </Typography>
            <div className="mt-2">
              <Radio
                value="simple"
                label={formatMessage(messages.summarizedView)}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="dataEvidence"
                checked={formik.values.dataEvidence === 'simple'}
              />
              <Radio
                value="full"
                label={formatMessage(messages.fullView)}
                className="ml-2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="dataEvidence"
                checked={formik.values.dataEvidence === 'full'}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="bg-white rounded-md px-6 py-4 shadow-md row-span-3"
          >
            <Typography className="mt-3 text-primary uppercase" style="medium">
              {formatMessage(generalMessages.inactivity)}
            </Typography>
            <Typography>
              {formatMessage(messages.waitTimeUntilInactivityClosePolicy)}
            </Typography>
            <SelectField
              items={[
                { value: 10 },
                { value: 9 },
                { value: 8 },
                { value: 7 },
                { value: 6 },
                { value: 5 }
              ]}
              textField="value"
              valueField="value"
              className="mt-2"
              onChange={async (val) =>
                await formik.setFieldValue('inactivityTime', val)
              }
              value={formik.values.inactivityTime}
              label={formatMessage(messages.waitTimeUntilClose)}
              error={Boolean(
                formik.touched.inactivityTime && formik.errors.inactivityTime
              )}
              helperText={
                formik.touched.inactivityTime && formik.errors.inactivityTime
                  ? formik.errors.inactivityTime
                  : ''
              }
            />
            <Typography className="mt-3 text-primary uppercase" style="medium">
              {formatMessage(messages.openSessions)}
            </Typography>
            <Typography>
              {formatMessage(messages.openSessionsPolicy)}
            </Typography>
            <SelectField
              items={[{ value: 1 }, { value: 2 }, { value: 3 }]}
              textField="value"
              valueField="value"
              className="mt-2"
              onChange={async (val) =>
                await formik.setFieldValue('openSessions', val)
              }
              value={formik.values.openSessions}
              label={formatMessage(messages.maximunOpenSessions)}
              error={Boolean(
                formik.touched.openSessions && formik.errors.openSessions
              )}
              helperText={
                formik.touched.openSessions && formik.errors.openSessions
                  ? formik.errors.openSessions
                  : ''
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="bg-white rounded-md px-6 py-4 shadow-md h-52"
          >
            <Typography style="medium" className="text-secondary uppercase">
              {formatMessage(messages.downloadRoute)}
            </Typography>
            <Typography>{formatMessage(messages.selectRoutePath)}</Typography>
            <TextField
              label="URL"
              name="url"
              value={formik.values.url}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.url && formik.errors.url)}
              helperText={
                formik.touched.url && formik.errors.url ? formik.errors.url : ''
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="bg-white rounded-md px-6 py-4 shadow-md h-52"
          >
            <Typography style="medium" className="text-secondary uppercase">
              {formatMessage(messages.doubleStepDelete)}
            </Typography>
            <Typography>
              {formatMessage(messages.doubleStepDeletePolicy)}
            </Typography>
            <div className="flex items-center gap-2 mt-3">
              <Switch
                color="primary"
                value={formik.values.doubleStepDelete}
                onChange={async (value) =>
                  await formik.setFieldValue('doubleStepDelete', value)
                }
                size="sm"
              />
              <Typography variant="caption">
                {formatMessage(messages.activateDoubleStepDelete)}
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="bg-white rounded-md px-6 py-4 shadow-md"
          >
            <LabelsAdministration />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="bg-white rounded-md px-6 py-4 shadow-md "
          >
            <LetterheadAdministration />
          </Grid>
        </Grid>
        <div className="mt-4 text-right">
          <Button variant="contained" color="primary" type="submit">
            {formatMessage(actionsMessages.save)}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default GeneralConfig
