import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'

import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import Accordion from 'components/Accordion'
import Form from 'components/Form'
import Typography from 'components/Typography'
import { Field } from 'types/form'

interface FormValues {
  name: string
  url: string
  username: string
}

interface FormProps {
  initialValues?: FormValues
  onSubmit?: (values: FormValues) => void
}

const FormComponent = ({
  initialValues,
  onSubmit
}: FormProps): ReactElement => {
  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'social-media-name',
        label: 'Nombre de la red social',
        placeholder: 'Ej. Facebook'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'url',
      options: {
        id: 'social-media-url',
        label: 'URL',
        placeholder: 'Ej. https://facebook.com/user123456'
      },
      breakpoints: { xs: 12, md: 3 }
    },
    {
      type: 'text',
      name: 'username',
      options: {
        id: 'social-media-username',
        label: 'Nombre de usuario',
        placeholder: 'Ej. armandoalbor'
      },
      breakpoints: { xs: 12, md: 3 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required('Requerido'),
    url: yup.string().required('Requerido'),
    username: yup.string().required('Requerido')
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        url: initialValues?.url ?? '',
        username: initialValues?.username ?? ''
      },
      validationSchema,
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
    />
  )
}

const SocialMediaForm = (): ReactElement => {
  // const onSubmit = async (values: any): Promise<any> => {
  //   console.log('formValues', values)
  // }

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-2">
        <Typography variant="title" style="bold">
          REDES SOCIALES
        </Typography>

        <PlusCircleIcon
          className="w-8 h-8 cursor-pointer text-primary hover:text-primary-700"
          onClick={() => alert('Add new language')}
        />
      </div>

      <Accordion
        useCustomTitle
        title={
          <div className="flex justify-between w-full">
            <Typography
              variant="subtitle"
              style="semibold"
              className="uppercase"
            >
              Red social 1
            </Typography>
          </div>
        }
        classNames={{
          button: 'bg-white mt-1 rounded-md items-center rounded-b-none',
          chevronIcon: 'text-primary-500'
        }}
      >
        <div className="bg-white p-2.5 rounded-b-md">
          <FormComponent />
        </div>
      </Accordion>

      <Accordion
        useCustomTitle
        title={
          <div className="flex justify-between w-full pr-2">
            <Typography
              variant="subtitle"
              style="semibold"
              className="uppercase"
            >
              Red social 2
            </Typography>
          </div>
        }
        classNames={{
          button: 'bg-white mt-1 rounded-md items-center rounded-b-none',
          chevronIcon: 'text-primary-500'
        }}
      >
        <div className="bg-white p-2 rounded-b-md">
          <FormComponent />

          <div className="flex justify-end w-full mt-4">
            <TrashIcon
              className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-700"
              onClick={() => alert('Add new language')}
            />
          </div>
        </div>
      </Accordion>

      <Accordion
        useCustomTitle
        title={
          <div className="flex justify-between w-full pr-2">
            <Typography
              variant="subtitle"
              style="semibold"
              className="uppercase"
            >
              Red social 3
            </Typography>
          </div>
        }
        classNames={{
          button: 'bg-white mt-1 rounded-md items-center rounded-b-none',
          chevronIcon: 'text-primary-500'
        }}
      >
        <div className="bg-white p-2 rounded-b-md">
          <FormComponent />

          <div className="flex justify-end w-full mt-4">
            <TrashIcon
              className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-700"
              onClick={() => alert('Add new language')}
            />
          </div>
        </div>
      </Accordion>
    </div>
  )
}

export default SocialMediaForm
