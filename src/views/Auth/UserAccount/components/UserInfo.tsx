import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Typography from 'components/Typography'
import Grid from 'components/Grid'
import Card from 'components/Card'
import Form from 'components/Form'
import Tag from 'components/Tag'
import { useAuth } from 'context/Auth'
import { Field } from 'types/form'
import { formMessages } from 'globalMessages'
import { userInfoMessages } from '../messages'
import useToast from 'hooks/useToast'

interface FormValues {
  name: string
  lastname: string
  username: string
  email: string
  extension: string
  position: string
  groups: string[]
}

// TODO: remove this, only for demo purposes
const mockGroups = [
  {
    id: 'g1',
    name: 'Grupo 1'
  },
  {
    id: 'g2',
    name: 'Grupo 2 medio'
  },
  {
    id: 'g3',
    name: 'Grupo 3'
  }
]

const UserInfo = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { auth, actions } = useAuth()
  const { launchToast } = useToast()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'name',
        label: formatMessage(userInfoMessages.name),
        placeholder: formatMessage(userInfoMessages.name),
        inputProps: {
          disabled: true,
          className: 'text-gray-500 border-none cursor-not-allowed'
        }
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'extension',
      options: {
        id: 'extension',
        label: formatMessage(userInfoMessages.extension),
        placeholder: formatMessage(userInfoMessages.extension),
        inputProps: {
          className: 'border-gray-300'
        }
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'lastname',
      options: {
        id: 'lastname',
        label: formatMessage(userInfoMessages.lastname),
        placeholder: formatMessage(userInfoMessages.lastname),
        inputProps: {
          disabled: true,
          className: 'text-gray-500 border-none cursor-not-allowed'
        }
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'position',
      options: {
        id: 'position',
        label: formatMessage(userInfoMessages.position),
        placeholder: formatMessage(userInfoMessages.position),
        inputProps: {
          className: 'border-gray-300'
        }
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'username',
      options: {
        id: 'username',
        label: formatMessage(userInfoMessages.username),
        placeholder: formatMessage(userInfoMessages.username),
        inputProps: {
          disabled: true,
          className: 'text-gray-500 border-none cursor-not-allowed'
        }
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'custom',
      name: 'groups',
      children: (
        <>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            data-headlessui-state=""
          >
            {formatMessage(userInfoMessages.groups)}
          </label>

          <div className="flex flex-wrap space-x-2">
            {mockGroups.map((group) => (
              <Tag
                key={group.id}
                label={group.name}
                className="text-sm py-0.5 px-3 bg-blue-50 mt-1 ml-2"
                labelColorClassName=""
                roundedClassName="rounded-sm"
              />
            ))}
          </div>
        </>
      ),
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        id: 'email',
        label: formatMessage(userInfoMessages.email),
        placeholder: formatMessage(userInfoMessages.email),
        inputProps: {
          className: 'border-gray-300'
        }
      },
      breakpoints: { xs: 12, md: 6 }
    }
  ]

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email(formatMessage(formMessages.invalidEmail))
      .required(formatMessage(formMessages.required)),
    extension: yup.string().required(formatMessage(formMessages.required)),
    position: yup.string().required(formatMessage(formMessages.required))
  })

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: {
      name: auth.profile.names,
      lastname: auth.profile.lastName,
      username: auth.profile.username,
      email: auth.profile.email,
      extension: auth.profile.phone,
      position: auth.profile.position,
      groups: []
    },
    validationSchema,
    onSubmit: async (values) => {
      const updated = await actions?.updateProfile({
        email: values.email,
        phoneExtension: values.extension,
        position: values.position
      })
      if (updated) {
        launchToast({
          title: formatMessage(userInfoMessages.success),
          type: 'Success'
        })
      }
    }
  }

  return (
    <>
      <Grid spacing={4}>
        <Grid item cols={6}>
          <Card>
            <Typography variant="subtitle" style="semibold" className="mb-2">
              {formatMessage(userInfoMessages.startDate)}
            </Typography>
            <Typography variant="body1">{auth.profile.since}</Typography>
          </Card>
        </Grid>
        <Grid item cols={6}>
          <Card>
            <Typography variant="subtitle" style="semibold" className="mb-2">
              {formatMessage(userInfoMessages.role)}
            </Typography>
            <Typography variant="body1">{auth.profile.role}</Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid className="mt-5" spacing={4}>
        <Grid item cols={12}>
          <Card>
            <Typography variant="subtitle" style="semibold" className="mb-2">
              {formatMessage(userInfoMessages.generalData)}
            </Typography>

            <Form
              formikConfig={formikConfig}
              fields={fields}
              submitButtonPosition="right"
              submitButtonLabel={formatMessage(userInfoMessages.submitButton)}
              submitButtonProps={{
                color: 'indigo',
                variant: 'contained',
                className: 'mt-6 mb-2'
              }}
              className="user-account-data-form"
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default UserInfo
