/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { MutableRefObject, ReactElement } from 'react'
import { FormikConfig, FormikContextType } from 'formik'
import Form from 'components/Form'
import { Field, Section } from 'types/form'

interface Props<T> {
  initialValues: T
  fields: Array<Field<T>>
  validationSchema?: any
  onSubmit?: (values: T) => void
  onChangeValues?: (values: FormikContextType<T>) => void
  formikRef?:
    | MutableRefObject<FormikContextType<T> | undefined>
    | ((ref: FormikContextType<T> | undefined) => void)
  withSections?: {
    renderMainSection: boolean
    sections: Section[]
  }
}

const GenericForm = <T extends Object>({
  initialValues,
  fields,
  validationSchema,
  onSubmit,
  onChangeValues,
  withSections,
  formikRef
}: Props<T>): ReactElement => {
  const initialValuesMapped: T = {} as T

  Object.keys(initialValues).forEach((keyName) => {
    initialValuesMapped[keyName] = initialValues[keyName] ?? ''
  })

  const formikConfig: FormikConfig<T> = {
    initialValues: initialValuesMapped,
    validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      if (onSubmit) onSubmit(values)
    },
    enableReinitialize: true
  }

  return (
    <Form
      formikConfig={formikConfig}
      formikRef={formikRef}
      fields={fields}
      renderSubmitButton={false}
      initialValuesCanChange
      withSections={withSections}
      onChangeValues={onChangeValues}
    />
  )
}

export default GenericForm
