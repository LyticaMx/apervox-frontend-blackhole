import clsx from 'clsx'
import Button from 'components/Button'
import Grid, { Spacing } from 'components/Grid'
import Typography from 'components/Typography'
import {
  FormikConfig,
  FormikContextType,
  FormikValues,
  useFormik
} from 'formik'
import { actionsMessages } from 'globalMessages'
import { MutableRefObject, ReactElement, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field, Section, SubmitButtonProps } from 'types/form'
import { fieldMapper } from './helpers'

interface Props<T> {
  fields: Field[]
  formikConfig: FormikConfig<T>
  withSections?: {
    renderMainSection?: boolean
    sections: Section[]
  }
  mainSpacing?: Spacing
  renderSubmitButton?: boolean
  submitButtonLabel?: string
  submitButtonProps?: SubmitButtonProps
  formikRef?: MutableRefObject<FormikContextType<T> | undefined>
}

const Form = <DataType extends FormikValues = FormikValues>(
  props: Props<DataType>
): ReactElement => {
  const {
    fields,
    mainSpacing,
    formikConfig,
    withSections,
    renderSubmitButton = true,
    submitButtonLabel,
    submitButtonProps = {},
    formikRef
  } = props
  const { formatMessage } = useIntl()
  const formik = useFormik<DataType>(formikConfig)

  /* Para validar al montarse
  useEffect(() => {
    if (validateOnMount) formik.validateForm();
  }, []);
  */

  const formattedSections = useMemo<Section[]>(() => {
    const main: Section[] = [{ name: 'main', spacing: mainSpacing ?? 2 }]
    if (!withSections) return main
    if (withSections.renderMainSection) {
      return main.concat(withSections.sections)
    }
    return withSections.sections
  }, [withSections])

  useEffect(() => {
    if (formikRef) formikRef.current = formik
  }, [formik])

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      {formattedSections.map(({ name, title, description, spacing }, index) => (
        <div key={`${index}-${name}`} className={clsx(index !== 0 && 'mt-4')}>
          {title && (
            <Typography variant="body1" {...title}>
              {title.text}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" className="text-gray-400">
              {description.text}
            </Typography>
          )}
          {(!!title || !!description) && <div className="mt-4" />}
          <Grid spacing={spacing}>
            {fields
              .filter((field) => (field.section ?? 'main') === name)
              .map((field, index) => (
                <Grid
                  key={`${index}-${field.type}`}
                  item
                  xs={12}
                  {...field.breakpoints}
                >
                  {fieldMapper({ field, formik })}
                </Grid>
              ))}
          </Grid>
        </div>
      ))}

      {renderSubmitButton && (
        <Button
          {...submitButtonProps}
          type="submit"
          className={clsx('mt-2', submitButtonProps.className)}
        >
          {submitButtonLabel ?? formatMessage(actionsMessages.send)}
        </Button>
      )}
    </form>
  )
}

export default Form
