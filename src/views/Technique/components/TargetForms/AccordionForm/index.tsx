/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useMemo, useState, useRef } from 'react'
import { FormikContextType } from 'formik'
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useGlobalMessage } from 'hooks/useIntl'
import Typography from 'components/Typography'
import Button from 'components/Button'
import { Field, Section } from 'types/form'
import BasicAccordion from './BasicAccordion'
import GenericForm from './GenericForm'
import useToast from 'hooks/useToast'
import { useIntl } from 'react-intl'
import { targetMetaFormMessages } from 'views/Technique/messages'
import useForceUpdate from 'hooks/useForceUpdate'
import { useDidMountEffect } from 'hooks/useDidMountEffect'

interface Props<T> {
  title: string
  itemTitle: string
  fields: Array<Field<T & { id?: string }>>
  validationSchema?: any
  withSections?: {
    renderMainSection: boolean
    sections: Section[]
  }
  onDelete?: (id: string) => Promise<boolean>
  onSubmit?: (data: T[]) => void | Promise<void>
  onReset?: (ids: string[]) => Promise<boolean> // Preguntar
  initialData?: T[]
}

interface FormData<T> {
  isValid: boolean
  touched: { [k: string]: boolean } | null
  data: Partial<T & { id?: string }>
}

const AccordionForm = <T extends Object>({
  title,
  itemTitle,
  fields,
  validationSchema,
  withSections,
  onDelete,
  onSubmit,
  initialData
}: Props<T>): ReactElement => {
  const getGlobalMessage = useGlobalMessage()
  const { formatMessage } = useIntl()
  const { updatesForced, forceUpdate } = useForceUpdate()
  const formikRefs = useRef<
    Map<string, FormikContextType<T & { id?: string }> | undefined>
  >(new Map())
  const genEmpty = (): FormData<T> => ({
    isValid: false,
    touched: null,
    data: fields.reduce<any>((prev, field) => {
      if (field.name === 'city-selector') {
        prev.country = ''
        prev.state = ''
        prev.city = ''
      } else prev[field.name] = ''
      return prev
    }, {})
  })

  const initialFormData: Array<FormData<T>> = useMemo(() => {
    if (initialData && initialData.length > 0) {
      return initialData.map((item) => ({
        data: item,
        isValid: true,
        touched: null
      }))
    }

    return [genEmpty()]
  }, [initialData])

  const valuesRef = useRef<any[]>(initialFormData)
  const [errors, setErrors] = useState<any>({})
  const [totalForms, setTotalForms] = useState(1)
  const { launchToast } = useToast()

  const handleAddForm = (): void => {
    valuesRef.current = [...valuesRef.current, genEmpty()]
    setTotalForms((prev) => prev + 1)
  }

  const handleRemoveForm = (index: number): void => {
    // TODO: Eliminar del map
    const newLanguages = [...valuesRef.current]
    newLanguages.splice(index, 1)
    valuesRef.current = [...newLanguages]

    setTotalForms((prev) => prev - 1)
  }

  const handleUpdateForm = (
    index: number,
    formik: FormikContextType<T>
  ): void => {
    const newLanguages = [...valuesRef.current]

    newLanguages[index] = {
      isValid: formik.isValid,
      touched: formik.touched,
      data: formik.values
    }

    valuesRef.current = [...newLanguages]

    const newErrors = { ...errors, [index]: false }
    setErrors(newErrors)
  }

  const handleValidateAll = (): boolean => {
    let isValid = true
    const errors = {}

    formikRefs.current.forEach((value) => {
      value?.setTouched(
        fields.reduce<any>((prev, field) => {
          if (field.name === 'city-selector') {
            prev.country = true
            prev.state = true
            prev.city = true
          } else prev[field.name] = true
          return prev
        }, {})
      )

      value?.validateForm()
    })

    console.log(Array.from<string>(formikRefs.current.keys()))

    valuesRef.current.forEach((form, index) => {
      errors[index] = !form.isValid

      if (!form.isValid) {
        isValid = false
      }
    })

    setErrors(errors)

    return isValid
  }

  const handleResetAll = async (): Promise<void> => {
    valuesRef.current = [genEmpty()]

    const ids = Array.from(formikRefs.current.values()).filter(
      (form) => form?.values?.id
    )
    if (ids.length > 0) {
      console.log('reset')
      return
    }

    formikRefs.current = new Map<
      string,
      FormikContextType<T & { id?: string }>
    >()
    setTotalForms(1)
    setErrors({})
  }

  const forms = useMemo(() => {
    return Array.from({ length: totalForms }, (_, index) => {
      const formData = valuesRef.current[index]

      return (
        <BasicAccordion
          key={index}
          title={`${itemTitle} ${index + 1}`}
          startOpen
          error={!!errors[index]}
        >
          <div
            className="bg-white rounded-b-md p-4 mb-6"
            id={`${index}-${formData?.data?.id ?? 0}`}
          >
            <GenericForm<T>
              fields={fields.map((field) => {
                if (
                  field.type === 'text' ||
                  field.type === 'radio' ||
                  field.type === 'checkbox'
                ) {
                  if (field.options.id) {
                    return {
                      ...field,
                      options: {
                        ...field.options,
                        id: `${field.options.id}-${index}`
                      }
                    } as any
                  }
                }
                return field
              })}
              validationSchema={validationSchema}
              initialValues={formData ? formData.data : undefined}
              onChangeValues={(formik: FormikContextType<T>) => {
                handleUpdateForm(index, formik)
              }}
              formikRef={(ref) => {
                formikRefs.current.set(`${itemTitle} ${index + 1}`, ref)
              }}
              withSections={withSections}
            />

            {index > 0 && (
              <div className="py-4 flex items-center justify-end w-full">
                <TrashIcon
                  className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-700"
                  onClick={async () => {
                    if (!formData?.data?.id) {
                      handleRemoveForm(index)
                      launchToast({
                        title: formatMessage(
                          targetMetaFormMessages.deletedForm
                        ),
                        type: 'Success'
                      })
                      return
                    }
                    const canDelete =
                      (await onDelete?.(formData.data.id)) ?? false
                    if (canDelete) {
                      handleRemoveForm(index)
                      launchToast({
                        title: formatMessage(
                          targetMetaFormMessages.deletedForm
                        ),
                        type: 'Success'
                      })
                    } else {
                      launchToast({
                        title: formatMessage(
                          targetMetaFormMessages.formNotDeleted
                        ),
                        type: 'Warning'
                      })
                    }
                  }}
                />
              </div>
            )}
          </div>
        </BasicAccordion>
      )
    })
  }, [totalForms, errors, initialFormData, updatesForced])

  useDidMountEffect(() => {
    valuesRef.current = initialFormData
    if (initialFormData.length === totalForms) forceUpdate()
    setTotalForms(initialFormData.length)
  }, [initialFormData])

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-2">
        <Typography variant="title" style="bold">
          {title}
        </Typography>

        <PlusCircleIcon
          className="w-8 h-8 cursor-pointer text-primary hover:text-primary-700"
          onClick={handleAddForm}
        />
      </div>

      <div className="max-h-[62vh] overflow-y-auto">
        {forms}

        <Button
          variant="contained"
          color="primary"
          className="my-2 float-right"
          onClick={() => {
            const isValid = handleValidateAll()

            if (isValid) {
              onSubmit?.(valuesRef.current.map((item) => item.data) as T[])
            }
          }}
        >
          {getGlobalMessage('save', 'actionsMessages')}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className="my-2 mx-2 float-right"
          disabled={totalForms < 2}
          onClick={handleResetAll}
        >
          {getGlobalMessage('restore', 'actionsMessages')}
        </Button>
      </div>
    </div>
  )
}

export default AccordionForm
