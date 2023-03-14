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
  fields: Array<Field<T>>
  formikConfig: FormikConfig<T>
  withSections?: {
    renderMainSection?: boolean
    sections: Section[]
  }
  mainSpacing?: Spacing
  renderSubmitButton?: boolean
  submitButtonLabel?: string
  submitButtonPosition?: 'left' | 'center' | 'right'
  submitButtonProps?: SubmitButtonProps
  formikRef?: MutableRefObject<FormikContextType<T> | undefined>
  className?: string
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
    submitButtonPosition,
    submitButtonProps = {},
    formikRef,
    className
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

  const buttonPosition = useMemo(() => {
    switch (submitButtonPosition) {
      case 'center':
        return 'justify-center'
      case 'right':
        return 'justify-end'
      case 'left':
      default:
        return 'justify-start'
    }
  }, [submitButtonPosition])

  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      className={className}
    >
      {formattedSections.map(
        (
          { name, title, description, spacing, removeSeparator, className },
          index
        ) => (
          <div
            key={`${index}-${name}`}
            className={clsx(index !== 0 && 'mt-4', className)}
          >
            {title && (
              <Typography variant="body1" {...title}>
                {title.text}
              </Typography>
            )}
            {description && (
              <Typography
                variant="body2"
                className="text-gray-400"
                {...description}
              >
                {description.text}
              </Typography>
            )}
            {(!!title || !!description) && !removeSeparator && (
              <div className="mt-4" />
            )}
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
        )
      )}

      <div className={clsx('flex items-center', buttonPosition)}>
        {renderSubmitButton && (
          <Button
            {...submitButtonProps}
            type="submit"
            className={clsx('mt-2', submitButtonProps.className)}
          >
            {submitButtonLabel ?? formatMessage(actionsMessages.send)}
          </Button>
        )}
      </div>
    </form>
  )
}

export default Form
