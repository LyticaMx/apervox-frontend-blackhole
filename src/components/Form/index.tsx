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
import {
  MutableRefObject,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo
} from 'react'
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
  formikRef?:
    | MutableRefObject<FormikContextType<T> | undefined>
    | ((ref: FormikContextType<T> | undefined) => void)
  className?: string
  initialValuesCanChange?: boolean
  onChangeValues?: (values: FormikContextType<T>) => void
  buttons?: ReactNode
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
    className,
    initialValuesCanChange,
    onChangeValues
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
    if (formikRef) {
      if (typeof formikRef === 'function') {
        formikRef(formik)
      } else {
        formikRef.current = formik
      }
    }
  }, [formik])

  // Add this method to update form values when base instance re-render with another initialValues
  useEffect(() => {
    if (initialValuesCanChange && formik) {
      const keys = Object.keys(formikConfig.initialValues)

      keys.forEach((keyName) => {
        formik.setFieldValue(keyName, formikConfig.initialValues[keyName])
      })
    }
  }, [formikConfig.initialValues])

  // Add this method to broadcast form changes when values or status of the formik instance are updated
  useEffect(() => {
    if (onChangeValues) {
      onChangeValues(formik)
    }
  }, [formik.isValid, formik.values])

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
                .map((field, index) => {
                  if (field.renderIf) {
                    if (
                      !Object.keys(field.renderIf).some((key) => {
                        if (key.startsWith('!')) {
                          const formikKey = key.substring(1)
                          return (
                            formik.values[formikKey] !== field.renderIf?.[key]
                          )
                        }
                        return formik.values[key] === field.renderIf?.[key]
                      })
                    ) {
                      if (formik.values[field.name] !== '') {
                        // Reset para cuando se vuelvan a renderizar aparezca su valor original
                        formik.setFieldValue(
                          field.name,
                          formik.initialValues[field.name] ?? ''
                        )
                      }
                      return null
                    }
                  }

                  return field.type !== 'city-selector' ? (
                    <Grid
                      key={`${index}-${field.type}`}
                      item
                      xs={12}
                      {...field.breakpoints}
                    >
                      {fieldMapper({ field, formik })}
                    </Grid>
                  ) : (
                    <>{fieldMapper({ field, formik })}</>
                  )
                })}
            </Grid>
          </div>
        )
      )}

      <div className={clsx('flex items-center', buttonPosition)}>
        {renderSubmitButton && !props.buttons && (
          <Button
            {...submitButtonProps}
            type="submit"
            className={clsx('mt-2', submitButtonProps.className)}
          >
            {submitButtonLabel ?? formatMessage(actionsMessages.send)}
          </Button>
        )}
        {props.buttons}
      </div>
    </form>
  )
}

export default Form
