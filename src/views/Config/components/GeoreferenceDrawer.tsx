import clsx from 'clsx'
import Form from 'components/Form'
import Typography from 'components/Typography'
import { FormikConfig, FormikContextType } from 'formik'
import { actionsMessages, formMessages, generalMessages } from 'globalMessages'
import { ReactElement, useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Field, Section } from 'types/form'
import { telecomMessages } from '../messages'
import * as yup from 'yup'

interface FormValues {
  cellId: string
  latitude: string
  longitude: string
  file?: File | null
}

interface ExtraOptions {
  withSections: {
    sections: Section[]
    renderMainSection?: boolean
  }
}

interface Props {
  onAccept: (data: FormValues) => Promise<void>
  subtitle: string
  editMode?: boolean
  initialValues?: FormValues
}

const GeoreferenceDrawer = (props: Props): ReactElement => {
  const {
    subtitle,
    initialValues = { cellId: '', latitude: '', longitude: '', file: null },
    onAccept,
    editMode
  } = props
  const formikRef = useRef<FormikContextType<FormValues>>()
  const { formatMessage } = useIntl()

  const fields = useMemo<Array<Field<FormValues>>>(
    () =>
      editMode
        ? [
            {
              type: 'text',
              name: 'cellId',
              options: {
                id: 'cellId',
                placeholder: formatMessage(telecomMessages.geoPlaceholder),
                label: formatMessage(telecomMessages.cellId)
              }
            },
            {
              type: 'text',
              name: 'latitude',
              options: {
                id: 'latitude',
                placeholder: formatMessage(telecomMessages.geoPlaceholder),
                label: formatMessage(generalMessages.latitude)
              }
            },
            {
              type: 'text',
              name: 'longitude',
              options: {
                id: 'longitude',
                placeholder: formatMessage(telecomMessages.geoPlaceholder),
                label: formatMessage(generalMessages.longitude)
              }
            }
          ]
        : [
            {
              type: 'text',
              name: 'cellId',
              options: {
                id: 'cellId',
                placeholder: formatMessage(telecomMessages.geoPlaceholder),
                label: formatMessage(telecomMessages.cellId)
              }
            },
            {
              type: 'text',
              name: 'latitude',
              options: {
                id: 'latitude',
                placeholder: formatMessage(telecomMessages.geoPlaceholder),
                label: formatMessage(generalMessages.latitude)
              }
            },
            {
              type: 'text',
              name: 'longitude',
              options: {
                id: 'longitude',
                placeholder: formatMessage(telecomMessages.geoPlaceholder),
                label: formatMessage(generalMessages.longitude)
              }
            },
            {
              section: 'massiveLoad',
              name: 'file',
              type: 'custom',
              children: ({ values, errors, touched }) => (
                <div>
                  <label
                    className={clsx(
                      'bg-white flex mt-4 rounded border-2 border-dashed text-center px-5 py-4 hover:cursor-pointer justify-center',
                      errors.file && touched.file
                        ? 'border-red-500'
                        : 'border-primary'
                    )}
                    htmlFor="file"
                  >
                    {values.file ? (
                      <span className="bloc text-primary">
                        {values.file.name}
                      </span>
                    ) : (
                      <span className="text-secondary-gray block">
                        {formatMessage(telecomMessages.uploadFile, {
                          clickHere: (
                            <span className="text-primary underline lowercase">
                              {formatMessage(actionsMessages.clickHere)}
                            </span>
                          )
                        })}
                      </span>
                    )}
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept="text/csv"
                    onChange={(e) =>
                      formikRef.current?.setFieldValue(
                        'file',
                        e.currentTarget.files?.[0]
                      )
                    }
                    className="hidden"
                  />
                  {errors.file && touched.file ? (
                    <span className="text-xs text-red-500">{errors.file}</span>
                  ) : null}
                </div>
              )
            }
          ],
    []
  )

  // para la eliminación de las dependencias ciclicas se necesita utilizar el shape
  const validationSchema = yup.object().shape(
    {
      cellId: yup.string().when('file', {
        is: (file) => !file,
        then: (schema) => schema.required(formatMessage(formMessages.required))
      }),
      latitude: yup.string().when('file', {
        is: (file) => !file,
        then: (schema) => schema.required(formatMessage(formMessages.required))
      }),
      longitude: yup.string().when('file', {
        is: (file) => !file,
        then: (schema) => schema.required(formatMessage(formMessages.required))
      }),
      file: yup.mixed().when(['cellId', 'latitude', 'longitude'], {
        is: (cellId, latitude, longitude) =>
          !cellId && !latitude && !longitude && !editMode,
        then: (schema) => schema.required(formatMessage(formMessages.required))
      })
    },
    [
      // Esto sirve para eliminar dependencias ciclicas
      ['file', 'cellId'],
      ['file', 'latitude'],
      ['file', 'longitude']
    ]
  )

  const formikConfig: FormikConfig<FormValues> = {
    initialValues,
    onSubmit: (values) => {
      console.log(values)
      onAccept(values)
    },
    validationSchema
  }

  const extraOptions = useMemo<ExtraOptions | {}>(
    () =>
      editMode
        ? {}
        : {
            withSections: {
              sections: [
                {
                  name: 'massiveLoad',
                  title: {
                    text: formatMessage(telecomMessages.massiveLoad),
                    className: 'text-primary uppercase'
                  }
                }
              ],
              renderMainSection: true
            }
          },
    [editMode]
  )

  return (
    <div className="w-96">
      <Typography>{subtitle}</Typography>
      <Form
        {...extraOptions}
        className="mt-3"
        fields={fields}
        formikConfig={formikConfig}
        formikRef={formikRef}
        submitButtonPosition="right"
        submitButtonProps={{
          color: 'primary',
          variant: 'contained'
        }}
        submitButtonLabel={formatMessage(actionsMessages.save)}
      />
    </div>
  )
}

export default GeoreferenceDrawer
