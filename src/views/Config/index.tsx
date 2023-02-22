import { MexicoFlag, UsaFlag } from 'assets/SVG'
import Button from 'components/Button'
import Checkbox from 'components/Form/Checkbox'
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
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import NavOptions from './components/NavOptions'
import { messages } from './messages'
import * as yup from 'yup'
import LabelsAdministration from './components/LabelsAdministration'
import LetterheadAdministration from './components/LetterheadAdministration'

interface FormValues {
  language: 'es-mx' | 'en-us'
  summarizedDataEvidence: boolean
  fullDataEvidence: boolean
  url: string
  doubleStepDelete: boolean
  failedAttemps: number
  timeUntilUnlock: number
  inactivityTime: number
  openSessions: number
}

const GeneralConfig = (): ReactElement => {
  const { formatMessage } = useIntl()

  const validationSchema = yup.object({
    url: yup.string().required(formatMessage(formMessages.required)),
    failedAttemps: yup
      .number()
      .typeError(formatMessage(formMessages.mustBeNumber))
      .required(formatMessage(formMessages.required))
      .min(1, formatMessage(formMessages.minValue, { value: 1 })),
    timeUntilUnlock: yup
      .number()
      .typeError(formatMessage(formMessages.mustBeNumber))
      .required(formatMessage(formMessages.required))
      .min(
        1,
        formatMessage(formMessages.minValue, {
          value: `1 ${formatMessage(timeMessages.minute).toLowerCase()}`
        })
      ),
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
      language: 'es-mx',
      summarizedDataEvidence: true,
      fullDataEvidence: false,
      doubleStepDelete: true,
      failedAttemps: 5,
      inactivityTime: 5,
      openSessions: 5,
      timeUntilUnlock: 15,
      url: 'C:\\Users\\user12\\BlackHole\\evidenciasdescargadas'
    },
    onSubmit: (values) => console.log(values),
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
                  value="es-mx"
                  onBlur={formik.handleBlur}
                  checked={formik.values.language === 'es-mx'}
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
                  value="en-us"
                  onBlur={formik.handleBlur}
                  checked={formik.values.language === 'en-us'}
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
              <Checkbox
                label={formatMessage(messages.summarizedView)}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="summarizedDataEvidence"
                checked={formik.values.summarizedDataEvidence}
              />
              <Checkbox
                label={formatMessage(messages.fullView)}
                className="ml-2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="fullDataEvidence"
                checked={formik.values.fullDataEvidence}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="bg-white rounded-md px-6 py-4 shadow-md row-span-3"
          >
            <Typography style="medium" className="uppercase text-secondary">
              {formatMessage(messages.authenticationPolicy)}
            </Typography>
            <Typography>
              {formatMessage(messages.maximumSessionNumberPolicy)}
            </Typography>
            <TextField
              name="failedAttemps"
              label={formatMessage(messages.failedLoginAttemps)}
              className="mt-2"
              value={formik.values.failedAttemps}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.failedAttemps && formik.errors.failedAttemps
              )}
              helperText={
                formik.touched.failedAttemps && formik.errors.failedAttemps
                  ? formik.errors.failedAttemps
                  : ''
              }
            />
            <Typography className="mt-3 text-secondary">
              {formatMessage(messages.timeUntilSessionUnlockPolicy)}
            </Typography>
            <TextField
              name="timeUntilUnlock"
              label={formatMessage(messages.waitTime)}
              className="mt-2"
              value={formik.values.timeUntilUnlock}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.timeUntilUnlock && formik.errors.timeUntilUnlock
              )}
              helperText={
                formik.touched.timeUntilUnlock && formik.errors.timeUntilUnlock
                  ? formik.errors.timeUntilUnlock
                  : ''
              }
            />
            <Typography className="mt-3 text-primary uppercase" style="medium">
              {formatMessage(generalMessages.inactivity)}
            </Typography>
            <Typography>
              {formatMessage(messages.waitTimeUntilInactivityClosePolicy)}
            </Typography>
            <TextField
              name="inactivityTime"
              className="mt-2"
              label={formatMessage(messages.waitTimeUntilClose)}
              value={formik.values.inactivityTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            <TextField
              name="openSessions"
              className="mt-2"
              label={formatMessage(messages.maximunOpenSessions)}
              value={formik.values.openSessions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
