import { ReactElement, useEffect, useMemo, useRef } from 'react'
import { FormikConfig, FormikContextType, FormikHelpers } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field, Section } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { formMessages } from 'globalMessages'
import { workGroupsFormMessages } from '../messages'

interface Option {
  value: string
  label: string
}

interface FormValues {
  name: string
  description: string
  users: Option[]
  techniques: Option[]
}

interface Props {
  initialValues?: FormValues
  open: boolean
  onSubmit: (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => Promise<void>
}

const WorkGroupForm = ({
  initialValues,
  onSubmit,
  open
}: Props): ReactElement => {
  const getMessage = useFormatMessage(formMessages)
  const getLocalFormMessage = useFormatMessage(workGroupsFormMessages)
  const getGlobalMessage = useGlobalMessage()
  const formikRef = useRef<FormikContextType<FormValues>>()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'workgroup-name',
        label: getMessage('name'),
        placeholder: getMessage('name'),
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'description',
      options: {
        id: 'workgroup-description',
        label: getMessage('description'),
        placeholder: getMessage('description'),
        multiline: true,
        rows: 4,
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      name: 'users',
      section: 'users',
      type: 'async-select',
      options: {
        asyncProps: {
          api: {
            endpoint: 'users',
            method: 'get'
          },
          value: 'id',
          label: 'username',
          searchField: 'username'
        },
        isMulti: true,
        placeholder: getLocalFormMessage('selectUsersPlaceholder'),
        loadingMessage: () => `${getLocalFormMessage('loading')}...`,
        noOptionsMessage: () => getLocalFormMessage('noOptions'),
        debounceTimeout: 300
      }
    },
    {
      name: 'techniques',
      section: 'techniques',
      type: 'async-select',
      options: {
        asyncProps: {
          api: {
            endpoint: 'techniques',
            method: 'get'
          },
          value: 'id',
          label: 'name',
          searchField: 'name'
        },
        isMulti: true,
        placeholder: getLocalFormMessage('selectTechniquesPlaceholder'),
        loadingMessage: () => `${getLocalFormMessage('loading')}...`,
        noOptionsMessage: () => getLocalFormMessage('noOptions'),
        debounceTimeout: 300
      }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    description: yup.string().required(getMessage('required'))
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        description: initialValues?.description ?? '',
        techniques: initialValues?.techniques ?? [],
        users: initialValues?.users ?? []
      },
      validationSchema,
      onSubmit,
      enableReinitialize: true
    }),
    [initialValues]
  )

  const sections: Section[] = [
    {
      name: 'users',
      title: {
        text: getGlobalMessage('users', 'generalMessages'),
        className: 'uppercase text-primary-500',
        style: 'medium'
      },
      description: {
        text: getLocalFormMessage('usersMessage'),
        variant: 'body2'
      }
    },
    {
      name: 'techniques',
      title: {
        text: getGlobalMessage('techniques', 'platformMessages'),
        className: 'uppercase text-primary-500',
        style: 'medium'
      },
      description: {
        text: getLocalFormMessage('techniquesMessage'),
        variant: 'body2'
      }
    }
  ]

  useEffect(() => {
    if (!open) formikRef.current?.resetForm()
  }, [open])

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
        withSections={{
          sections,
          renderMainSection: true
        }}
        formikRef={formikRef}
      />
    </div>
  )
}

export default WorkGroupForm
