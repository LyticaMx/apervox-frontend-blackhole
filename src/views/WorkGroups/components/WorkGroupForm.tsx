import { ReactElement, useMemo } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { formMessages } from 'globalMessages'

interface FormValues {
  name: string
  description: string
  users: string[]
  techniques: string[]
}

interface Props {
  initialValues?: FormValues
  onSubmit: (values: FormValues) => Promise<void>
}

const WorkGroupForm = ({ initialValues, onSubmit }: Props): ReactElement => {
  const getMessage = useFormatMessage(formMessages)
  const getGlobalMessage = useGlobalMessage()

  const fields: Field[] = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'workgroup-name',
        label: getMessage('name'),
        placeholder: getMessage('name')
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'description',
      options: {
        id: 'workgroup-description',
        label: getMessage('description'),
        placeholder: getMessage('description')
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'select-multiple',
      name: 'users',
      options: {
        label: getMessage('users'),
        items: [
          { id: 1, name: 'uno' },
          { id: 2, name: 'dos' },
          { id: 3, name: 'tres' },
          { id: 4, name: 'cuatro' },
          { id: 5, name: 'cinco' }
        ],
        textField: 'name',
        valueField: 'id',
        noFoundText: 'xxx'
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'select-multiple',
      name: 'techniques',
      options: {
        label: getMessage('techniques'),
        items: [
          { id: 1, name: 'uno' },
          { id: 2, name: 'dos' },
          { id: 3, name: 'tres' },
          { id: 4, name: 'cuatro' },
          { id: 5, name: 'cinco' }
        ],
        textField: 'name',
        valueField: 'id',
        noFoundText: 'xxx'
      },
      breakpoints: { xs: 12 }
    }

    // {
    //   type: 'custom',
    //   name: 'groups',
    //   children: (
    //     <>
    //       <label
    //         className="mb-1 block text-sm font-medium text-gray-700"
    //         data-headlessui-state=""
    //       >
    //         {getMessage('groups')}
    //       </label>

    //       <div className="flex flex-wrap space-x-2">
    //         {mockGroups.map((group) => (
    //           <Tag
    //             key={group.id}
    //             label={group.name}
    //             className="text-sm py-0.5 px-3 bg-blue-50 mt-1 ml-2"
    //             labelColorClassName=""
    //             roundedClassName="rounded-sm"
    //           />
    //         ))}
    //       </div>
    //     </>
    //   ),
    //   breakpoints: { xs: 12, md: 6 }
    // },
  ]

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    description: yup.string().required(getMessage('required')),
    users: yup.string().required(getMessage('required')),
    techniques: yup.string().trim().required(getMessage('required'))
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        name: initialValues?.name ?? '',
        description: initialValues?.description ?? '',
        users: initialValues?.users ?? [],
        techniques: initialValues?.techniques ?? []
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values)

        onSubmit(values)
      }
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
        // className="work-account-data-form"
      />
    </div>
  )
}

export default WorkGroupForm
