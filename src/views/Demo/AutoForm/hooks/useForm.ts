/* eslint-disable no-console */
import { FormikConfig } from 'formik'
import { Field, Section } from 'types/form'
import * as yup from 'yup'

interface FormValues {
  name: string
  gender: 'MALE' | 'FEMALE'
  password: string
  country: string
  agree: boolean
}

interface FormProps {
  fields: Field[]
  formikConfig: FormikConfig<FormValues>
  sections: Section[]
}

export const useForm = (): FormProps => {
  const validationSchema = yup.object({
    name: yup.string().required(),
    agree: yup
      .boolean()
      .oneOf([true], 'Debe aceptar los terminos y condiciones')
  })

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: {
      name: '',
      gender: 'MALE',
      password: '',
      country: '',
      agree: false
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validationSchema
  }

  const fields: Field[] = [
    {
      type: 'text',
      name: 'name',
      breakpoints: {
        md: 12,
        lg: 6,
        xl: 4
      },
      options: {
        id: 'name',
        label: 'Nombre(s)'
      }
    },
    {
      type: 'radio',
      name: 'gender',
      options: {
        label: 'Masculino',
        value: 'MALE'
      }
    },
    {
      type: 'radio',
      name: 'gender',
      options: {
        label: 'Femenino',
        value: 'FEMALE'
      }
    },
    {
      name: 'password',
      type: 'text',
      options: {
        id: 'password',
        type: 'password',
        label: 'Contraseña'
      },
      breakpoints: {
        xs: 3
      }
    },
    {
      type: 'select',
      section: 'location',
      name: 'country',
      options: {
        clearable: false,
        textField: 'label',
        valueField: 'value',
        items: [
          { value: 'mx', label: 'México' },
          { value: 'es', label: 'España' },
          { value: 'us', label: 'Estados Unidos' }
        ]
      },
      breakpoints: {
        md: 6
      }
    },
    {
      type: 'checkbox',
      name: 'agree',
      options: {
        label: 'Aceptar términos y condiciones'
      },
      section: 'agree'
    }
  ]

  const sections: Section[] = [
    {
      name: 'location',
      title: { text: 'Ubicación', style: 'semibold' }
    },
    {
      name: 'agree',
      title: {
        text: 'Términos y condiciones',
        style: 'semibold'
      },
      description: {
        text: 'Estos son los terminos y condiciones de la aplicación'
      }
    }
  ]

  return {
    formikConfig,
    fields,
    sections
  }
}
