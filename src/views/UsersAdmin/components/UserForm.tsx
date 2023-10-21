import { MutableRefObject, ReactElement, useMemo } from 'react'
import { FormikConfig, FormikContextType, FormikHelpers } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { userFormMessages } from '../messages'
import {
  onlyLetters,
  onlyLettersAndNumbers,
  username as usernamePattern
} from 'utils/patterns'

export interface FormValues {
  name: string
  lastname: string
  username: string
  email: string
  extension: string
  position: string
  role: any
  groups: any[]
  automaticSessionExpiration: boolean
}

interface Props {
  initialValues?: FormValues
  onSubmit: (
    values: FormValues,
    formikHelpers?: FormikHelpers<FormValues>
  ) => Promise<void>
  formikRef?: MutableRefObject<FormikContextType<FormValues> | undefined>
}

const UserForm = ({
  initialValues,
  onSubmit,
  formikRef
}: Props): ReactElement => {
  const getMessage = useFormatMessage(userFormMessages)
  const getGlobalMessage = useGlobalMessage()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'name',
        label: getMessage('name'),
        placeholder: getMessage('name'),
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'lastname',
      options: {
        id: 'lastname',
        label: getMessage('surnames'),
        placeholder: getMessage('surnames'),
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'username',
      options: {
        id: 'username',
        label: getMessage('username'),
        placeholder: getMessage('username'),
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        id: 'email',
        label: getMessage('email'),
        placeholder: getMessage('email'),
        requiredMarker: true
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
        placeholder: getMessage('position'),
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      name: 'role',
      type: 'async-select',
      options: {
        label: getMessage('role'),
        asyncProps: {
          api: { endpoint: 'roles', method: 'get' },
          value: 'id',
          label: 'name',
          searchField: 'name'
        },
        debounceTimeout: 300,
        placeholder: getMessage('selectRolePlaceholder'),
        loadingMessage: () => `${getMessage('loading')}...`,
        noOptionsMessage: () => getMessage('noOptions'),
        requiredMarker: true
      }
    },
    {
      name: 'groups',
      type: 'async-select',
      options: {
        label: getMessage('groups'),
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
        isMulti: true,
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
    name: yup
      .string()
      .required(getMessage('required'))
      .matches(onlyLetters, getMessage('onlyLetters')),
    lastname: yup
      .string()
      .required(getMessage('required'))
      .matches(onlyLetters, getMessage('onlyLetters')),
    username: yup
      .string()
      .required(getMessage('required'))
      .matches(usernamePattern, getMessage('invalidUsername')),
    email: yup
      .string()
      .trim()
      .email(getMessage('invalidEmail'))
      .required(getMessage('required')),
    extension: yup.string(),
    position: yup
      .string()
      .required(getMessage('required'))
      .matches(onlyLettersAndNumbers, getMessage('onlyLettersAndNumbers')),
    role: yup.object().required(getMessage('required')), // revisar validación
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
        formikRef={formikRef}
      />
    </div>
  )
}

export default UserForm
