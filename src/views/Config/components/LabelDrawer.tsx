import clsx from 'clsx'
import Form from 'components/Form'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import { FormikConfig, FormikContextType } from 'formik'
import { actionsMessages, formMessages } from 'globalMessages'
import { ReactElement, useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import { labelsAdministrationMessages } from '../messages'
import * as yup from 'yup'
import { EvidenceType } from 'types/label'

interface FormValues {
  evidenceType: EvidenceType
  name: string
  color: string
}

interface Props {
  onAccept: (data: FormValues) => Promise<void>
  subtitle: string
  initialValues?: FormValues
}

const LabelDrawer = (props: Props): ReactElement => {
  const {
    subtitle,
    onAccept,
    initialValues = { evidenceType: 'audio', name: '', color: '' }
  } = props
  const { formatMessage } = useIntl()
  const formikRef = useRef<FormikContextType<FormValues>>()
  const colors = useMemo<string[]>(
    () => [
      '#ffffff',
      '#53DC80',
      '#E8D903',
      '#F59A11',
      '#FF5D5D',
      '#E020F5',
      '#5DA9FF',
      '#4646FD',
      '#8D03E8',
      '#FF61DA',
      '#7B0404',
      '#000000'
    ],
    []
  )
  const fields = useMemo<Array<Field<FormValues>>>(
    () => [
      {
        type: 'select',
        name: 'evidenceType',
        options: {
          label: formatMessage(labelsAdministrationMessages.evidenceType),
          items: [
            {
              text: 'Evidencia de audio',
              value: 'audio'
            },
            {
              text: 'Evidencia de video',
              value: 'video'
            },
            {
              text: 'Evidencia de imagen',
              value: 'image'
            },
            {
              text: 'Evidencia de documento',
              value: 'document'
            }
          ],
          valueField: 'value',
          textField: 'text',
          clearable: false,
          optionsContainerClassname: '!w-[95%]'
        }
      },
      {
        type: 'text',
        name: 'label',
        options: {
          id: 'label',
          label: formatMessage(labelsAdministrationMessages.labelName),
          placeholder: formatMessage(
            labelsAdministrationMessages.labelNamePlaceholder
          )
        }
      },
      {
        name: 'color',
        type: 'custom',
        children: ({ values, errors }) => (
          <Grid spacing={1}>
            {colors.map((color) => (
              <Grid item xs={4} lg={2} key={color}>
                <button
                  type="button"
                  className={clsx(
                    'p-2 rounded-md',
                    values.color === color && 'bg-secondary-gray'
                  )}
                  onClick={() => {
                    formikRef.current?.setFieldValue('color', color)
                  }}
                >
                  <span
                    className="block w-8 h-8 rounded shadow-md"
                    style={{ backgroundColor: color }}
                  />
                </button>
              </Grid>
            ))}
            <Grid item xs={12}>
              {errors.color && (
                <Typography variant="caption" className="text-red-500">
                  {errors.color}
                </Typography>
              )}
            </Grid>
          </Grid>
        ),
        section: 'color'
      }
    ],
    []
  )

  const validationSchema = yup.object({
    label: yup.string().required(formatMessage(formMessages.required)),
    color: yup.string().required(formatMessage(formMessages.required))
  })

  const formikConfig: FormikConfig<FormValues> = {
    initialValues,
    onSubmit: async (values) => {
      await onAccept(values)
    },
    validationSchema
  }

  return (
    <div className="w-96">
      <Typography>{subtitle}</Typography>
      <Form
        className="mt-4"
        fields={fields}
        formikConfig={formikConfig}
        formikRef={formikRef}
        submitButtonPosition="right"
        submitButtonProps={{
          color: 'primary',
          variant: 'contained'
        }}
        submitButtonLabel={formatMessage(actionsMessages.save)}
        withSections={{
          sections: [
            {
              name: 'color',
              title: {
                text: formatMessage(
                  labelsAdministrationMessages.backgroundColor
                ),
                className: 'text-primary uppercase !text-lg',
                variant: 'title',
                style: 'medium'
              },
              description: {
                text: formatMessage(
                  labelsAdministrationMessages.selectBackgroundColor
                ),
                className: 'text-secondary',
                variant: 'body1'
              }
            }
          ],
          renderMainSection: true
        }}
      />
    </div>
  )
}

export default LabelDrawer
