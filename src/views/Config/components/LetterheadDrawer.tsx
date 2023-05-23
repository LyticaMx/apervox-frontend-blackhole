import Button from 'components/Button'
import Form from 'components/Form'
import Typography from 'components/Typography'
import { FormikConfig, FormikContextType } from 'formik'
import { actionsMessages, formMessages } from 'globalMessages'
import { ReactElement, useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import { letterheadAdministrationMessages } from '../messages'
import * as yup from 'yup'
import clsx from 'clsx'

interface FormValues {
  documentType: 'pdf' | 'excel' | 'word' | 'csv'
  letterheadName: string
  organizationName: string
  file: File | null
}

interface Props {
  onAccept: (data: FormValues) => Promise<void>
  subtitle: string
  initialValues?: FormValues
  fileName?: string
}

const LetterheadDrawer = (props: Props): ReactElement => {
  const {
    subtitle,
    onAccept,
    initialValues = {
      documentType: 'pdf',
      letterheadName: '',
      organizationName: '',
      file: null
    },
    fileName
  } = props
  const { formatMessage } = useIntl()
  const formikRef = useRef<FormikContextType<FormValues>>()

  const validationSchema = yup.object({
    letterheadName: yup.string().required(formatMessage(formMessages.required)),
    organizationName: yup
      .string()
      .required(formatMessage(formMessages.required)),
    file: yup.mixed().test({
      name: 'isFilename',
      params: { fileName },
      message: formatMessage(formMessages.required),
      test: (value) => value || fileName // En caso de que venga el filename no validar
    })
  })

  const formikConfig: FormikConfig<FormValues> = {
    initialValues,
    onSubmit: async (values) => {
      await onAccept(values)
    },
    validationSchema
  }

  const fields = useMemo<Array<Field<FormValues>>>(
    () => [
      {
        type: 'text',
        name: 'letterheadName',
        options: {
          id: 'letterheadName',
          placeholder: formatMessage(
            letterheadAdministrationMessages.letterheadNamePlaceholder
          ),
          label: formatMessage(letterheadAdministrationMessages.letterheadName)
        }
      },
      {
        type: 'select',
        name: 'documentType',
        options: {
          items: [
            { text: 'PDF', value: 'pdf' },
            { text: 'XLS', value: 'excel' },
            { text: 'CSV', value: 'csv' },
            { text: 'Word', value: 'word' }
          ],
          clearable: false,
          textField: 'text',
          valueField: 'value',
          label: formatMessage(letterheadAdministrationMessages.documentType),
          optionsContainerClassname: 'w-[95%]'
        }
      },
      {
        type: 'text',
        name: 'organizationName',
        options: {
          id: 'organizationName',
          label: formatMessage(
            letterheadAdministrationMessages.organizationName
          ),
          placeholder: formatMessage(
            letterheadAdministrationMessages.organizationNamePlaceholder
          )
        },
        section: 'template'
      },
      {
        section: 'template',
        name: 'file',
        type: 'custom',
        children: ({ values, errors, touched, setFieldValue }) => {
          return (
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
                {!!values.file || !!fileName ? (
                  <span className="bloc text-primary">
                    {values.file?.name ?? fileName}
                  </span>
                ) : (
                  <span className="text-secondary-gray block">
                    {formatMessage(
                      letterheadAdministrationMessages.uploadFile,
                      {
                        clickHere: (
                          <span className="text-primary underline lowercase">
                            {formatMessage(actionsMessages.clickHere)}
                          </span>
                        )
                      }
                    )}
                  </span>
                )}
              </label>
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue('file', e.currentTarget.files?.[0] ?? null)
                }
                className="hidden"
              />
              {errors.file && touched.file ? (
                <span className="text-xs text-red-500">{errors.file}</span>
              ) : null}
            </div>
          )
        }
      },
      {
        section: 'template',
        name: 'preview',
        type: 'custom',
        children: (
          <div className="my-3 text-right">
            <Button variant="contained" color="primary" type="button">
              {formatMessage(letterheadAdministrationMessages.previewTemplate)}
            </Button>
          </div>
        )
      }
    ],
    []
  )

  return (
    <div className="w-96">
      <Typography>{subtitle}</Typography>
      <Form
        className="mt-3"
        fields={fields}
        formikConfig={formikConfig}
        formikRef={formikRef}
        withSections={{
          sections: [
            {
              name: 'template',
              title: {
                text: formatMessage(
                  letterheadAdministrationMessages.templateData
                ),
                className: 'text-primary uppercase'
              }
            }
          ],
          renderMainSection: true
        }}
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

export default LetterheadDrawer
