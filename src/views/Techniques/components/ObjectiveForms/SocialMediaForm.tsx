import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field } from 'types/form'
import AccordionForm from './AccordionForm'

interface FormValues {
  name: string
  url: string
  username: string
}

const SocialMediaForm = (): ReactElement => {
  const { formatMessage } = useIntl()

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
    name: yup.string().required(formatMessage(formMessages.required)),
    url: yup.string().required(formatMessage(formMessages.required)),
    username: yup.string().required(formatMessage(formMessages.required))
  })

  return (
    <div>
      <AccordionForm<FormValues>
        fields={fields}
        validationSchema={validationSchema}
        title="REDES SOCIALES"
        itemTitle="Red social"
      />
    </div>
  )
}

export default SocialMediaForm
