/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useMemo, useState, useRef } from 'react'
import { FormikContextType } from 'formik'
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useGlobalMessage } from 'hooks/useIntl'
import Typography from 'components/Typography'
import Button from 'components/Button'
import { Field } from 'types/form'
import BasicAccordion from './BasicAccordion'
import GenericForm from './GenericForm'

interface Props<T> {
  title: string
  itemTitle: string
  fields: Array<Field<T>>
  validationSchema?: any
}

interface FormData<T> {
  isValid: boolean
  touched: { [k: string]: boolean } | null
  data: Partial<T>
}

const AccordionForm = <T extends Object>({
  title,
  itemTitle,
  fields,
  validationSchema
}: Props<T>): ReactElement => {
  const getGlobalMessage = useGlobalMessage()

  const initialFormData: FormData<T> = useMemo(() => {
    const initialData = {}

    fields.forEach((field) => {
      initialData[field.name] = ''
    })

    return {
      isValid: false,
      touched: null,
      data: initialData
    }
  }, [])

  const valuesRef = useRef<any[]>([initialFormData])
  const [errors, setErrors] = useState<any>({})
  const [totalForms, setTotalForms] = useState(1)

  const handleAddForm = (): void => {
    valuesRef.current = [...valuesRef.current, initialFormData]
    setTotalForms((prev) => prev + 1)
  }

  const handleRemoveForm = (index: number): void => {
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

    valuesRef.current.forEach((form, index) => {
      errors[index] = !form.isValid

      if (!form.isValid) {
        isValid = false
      }
    })

    setErrors(errors)

    return isValid
  }

  const handleResetAll = (): void => {
    valuesRef.current = [initialFormData]
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
            className="bg-white rounded-b-md p-2 mb-6"
            id={`${index}-${formData.data.name}`}
          >
            <GenericForm<T>
              fields={fields}
              validationSchema={validationSchema}
              initialValues={formData ? formData.data : undefined}
              onChangeValues={(formik: FormikContextType<T>) =>
                handleUpdateForm(index, formik)
              }
            />

            {index > 0 && (
              <div className="py-4 flex items-center justify-end w-full">
                <TrashIcon
                  className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-700"
                  onClick={() => handleRemoveForm(index)}
                />
              </div>
            )}
          </div>
        </BasicAccordion>
      )
    })
  }, [totalForms, errors])

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

      {forms}

      <Button
        variant="contained"
        color="primary"
        className="my-2 float-right"
        onClick={() => {
          const isValid = handleValidateAll()

          console.log(isValid, valuesRef.current)
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
  )
}

export default AccordionForm
