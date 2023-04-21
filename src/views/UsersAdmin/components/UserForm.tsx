import { ReactElement, useMemo } from 'react'
import { FormikConfig, FormikHelpers } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field, Section } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { userFormMessages } from '../messages'

interface FormValues {
  name: string
  lastname: string
  username: string
  email: string
  extension: string
  position: string
  role: string
  groups: any[]
  automaticSessionExpiration: boolean
}

interface Props {
  initialValues?: FormValues
  onSubmit: (
    values: FormValues,
    formikHelpers?: FormikHelpers<FormValues>
  ) => Promise<void>
}

const UserForm = ({ initialValues, onSubmit }: Props): ReactElement => {
  const getMessage = useFormatMessage(userFormMessages)
  const getGlobalMessage = useGlobalMessage()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'name',
        label: getMessage('name'),
        placeholder: getMessage('name')
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'lastname',
      options: {
        id: 'lastname',
        label: getMessage('surnames'),
        placeholder: getMessage('surnames')
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'username',
      options: {
        id: 'username',
        label: getMessage('username'),
        placeholder: getMessage('username')
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        id: 'email',
        label: getMessage('email'),
        placeholder: getMessage('email')
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'extension',
      options: {
        id: 'extension',
        label: getMessage('extension'),
        placeholder: getMessage('extension')
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'position',
      options: {
        id: 'position',
        label: getMessage('position'),
        placeholder: getMessage('position')
      },
      breakpoints: { xs: 12 }
    },
    {
      name: 'role',
      type: 'select',
      section: 'roles',
      options: {
        clearable: false,
        items: [
          {
            value: '6438832867fc00ea0266b1ee',
            text: 'root'
          }
        ],
        textField: 'text',
        valueField: 'value'
      }
    },
    {
      name: 'groups',
      type: 'async-select',
      section: 'groups',
      options: {
        asyncProps: {
          api: {
            endpoint: 'groups',
            method: 'get'
          },
          value: 'id',
          label: 'name',
          searchField: 'name'
        },
        debounceTimeout: 300,
        placeholder: getMessage('selectGroupsPlaceholder'),
        loadingMessage: () => `${getMessage('loading')}...`,
        noOptionsMessage: () => getMessage('noOptions')
      }
    },
    {
      type: 'switch',
      name: 'automaticSessionExpiration',
      options: {
        color: 'primary',
        size: 'sm',
        label: getMessage('automaticSessionExpiration')
      },
      breakpoints: { xs: 12 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    lastname: yup.string().required(getMessage('required')),
    username: yup.string().required(getMessage('required')),
    email: yup
      .string()
      .trim()
      .email(getMessage('invalidEmail'))
      .required(getMessage('required')),
    extension: yup.string(),
    position: yup.string().required(getMessage('required')),
    role: yup.string().required(getMessage('required')),
    groups: yup.array().required(getMessage('required')),
    automaticSessionExpiration: yup
      .bool()
      .required(getMessage('form.errors.required'))
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        lastname: initialValues?.lastname ?? '',
        username: initialValues?.username ?? '',
        email: initialValues?.email ?? '',
        extension: initialValues?.extension ?? '',
        position: initialValues?.position ?? '',
        role: initialValues?.role ?? '',
        automaticSessionExpiration:
          initialValues?.automaticSessionExpiration ?? false,
        groups: initialValues?.groups ?? []
      },
      validationSchema,
      onSubmit
    }),
    [initialValues]
  )

  const sections: Section[] = [
    {
      name: 'roles',
      title: {
        text: getMessage('role'),
        className: 'uppercase text-primary-500',
        style: 'medium'
      }
    },
    {
      name: 'groups',
      title: {
        text: getMessage('groups'),
        className: 'uppercase text-primary-500',
        style: 'medium'
      }
    }
  ]

  return (
    <div>
      <Form
        formikConfig={formikConfig}
        fields={fields}
        submitButtonPosition="right"
        submitButtonLabel={getGlobalMessage('save', 'actionsMessages')}
        submitButtonProps={{
          color: 'indigo',
          variant: 'contained',
          className: 'mt-6 mb-2'
        }}
        className="user-account-data-form"
        withSections={{
          sections,
          renderMainSection: true
        }}
      />
    </div>
  )
}

export default UserForm
