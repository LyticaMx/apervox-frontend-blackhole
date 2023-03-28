import { ReactElement, useEffect, useMemo, useRef, useState, memo } from 'react'
import { FormikConfig, FormikContextType } from 'formik'
import * as yup from 'yup'

import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import Form from 'components/Form'
import Typography from 'components/Typography'
import { Field } from 'types/form'
import Button from 'components/Button'
import BasicAccordion from './BasicAccordion'

interface FormValues {
  name: string
  level: string
}

interface FormProps {
  initialValues?: FormValues
  onSubmit?: (values: FormValues) => void
  onChangeValues?: (values: FormikContextType<FormValues>) => void
}

const FormComponentX = ({
  initialValues,
  onSubmit,
  onChangeValues
}: FormProps): ReactElement => {
  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'technique-name',
        label: 'Nombre del idioma o dialecto',
        placeholder: 'Ej. Náhuatl'
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'level',
      options: {
        id: 'techinque-description',
        label: 'Nivel de dominio',
        placeholder: 'Ej. nativo'
      },
      breakpoints: { xs: 12, md: 6 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required('Requerido'),
    level: yup.string().required('Requerido')
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        level: initialValues?.level ?? ''
      },
      validationSchema,
      // validateOnChange: true,
      onSubmit: (values) => {
        console.log(values)

        if (onSubmit) onSubmit(values)
      }
    }),
    [initialValues]
  )

  return (
    <Form
      formikConfig={formikConfig}
      fields={fields}
      submitButtonPosition="right"
      renderSubmitButton={false}
      onBroadcastChanges={onChangeValues}
    />
  )
}

const FormComponent = memo(FormComponentX)

const LanguagesForm = (): ReactElement => {
  const valuesRef = useRef<any[]>([])

  const initialLanguage = {
    isValid: false,
    data: {
      name: '',
      level: ''
    }
  }

  const [languages, setLanguages] = useState([initialLanguage])

  const handleAddForm = (): void => {
    setLanguages((prev) => [...prev, initialLanguage])

    valuesRef.current = [...valuesRef.current, initialLanguage]
  }

  const handleRemoveForm = (index: number): void => {
    setLanguages((prev) => {
      prev.splice(index, 1)

      return [...prev]
    })

    const newLanguages = [...languages]
    newLanguages.splice(index, 1)
    valuesRef.current = [...newLanguages]
  }

  useEffect(() => {
    valuesRef.current = languages
  }, [languages])

  const handleUpdateForm = (
    index: number,
    formik: FormikContextType<FormValues>
  ): void => {
    const newLanguages = [...languages]

    newLanguages[index] = {
      isValid: formik.isValid,
      data: formik.values
    }

    valuesRef.current = [...newLanguages]
  }

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-2">
        <Typography variant="title" style="bold">
          IDIOMAS Y DIALECTOS
        </Typography>

        <PlusCircleIcon
          className="w-8 h-8 cursor-pointer text-primary hover:text-primary-700"
          onClick={handleAddForm}
        />
      </div>

      {languages.map((language, index) => {
        return (
          <BasicAccordion
            key={`${index}-${language.data.name}`}
            title={`Idioma o Dialecto ${index + 1}`}
          >
            <div className="bg-white rounded-b-md p-2 mb-2">
              <FormComponent
                initialValues={language.data}
                onChangeValues={(values: FormikContextType<FormValues>) =>
                  handleUpdateForm(index, values)
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
      })}

      <Button
        variant="contained"
        color="indigo"
        className="my-2 float-right"
        onClick={() => console.log('valuesref', valuesRef.current)}
      >
        Guardar
      </Button>
    </div>
  )
}

export default LanguagesForm
