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
    name: 'Grupo 2'
  },
  {
    id: 'g3',
    name: 'Grupo 3'
  }
]

const UserInfo = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { auth } = useAuth()

  const fields: Field[] = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'name',
        label: formatMessage(userInfoMessages.name),
        placeholder: formatMessage(userInfoMessages.name)
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'extension',
      options: {
        id: 'extension',
        label: formatMessage(userInfoMessages.extension),
        placeholder: formatMessage(userInfoMessages.extension)
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'lastname',
      options: {
        id: 'lastname',
        label: formatMessage(userInfoMessages.lastname),
        placeholder: formatMessage(userInfoMessages.lastname)
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'position',
      options: {
        id: 'position',
        label: formatMessage(userInfoMessages.position),
        placeholder: formatMessage(userInfoMessages.position)
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'username',
      options: {
        id: 'username',
        label: formatMessage(userInfoMessages.username),
        placeholder: formatMessage(userInfoMessages.username)
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      name: 'groups',
      type: 'select-multiple',
      options: {
        label: formatMessage(userInfoMessages.groups),
        items: mockGroups,
        textField: 'name',
        valueField: 'id',
        noFoundText: 'Not found'
      },
      breakpoints: { xs: 12, md: 6 }
    },
    {
      type: 'text',
      name: 'email',
      options: {
        id: 'email',
        label: formatMessage(userInfoMessages.email),
        placeholder: formatMessage(userInfoMessages.email)
      },
      breakpoints: { xs: 12, md: 6 }
    }
  ]

  const validationSchema = yup.object({
    name: yup.string().required(formatMessage(formMessages.required)),
    lastname: yup.string().required(formatMessage(formMessages.required)),
    username: yup.string().required(formatMessage(formMessages.required)),
    email: yup
      .string()
      .trim()
      .email(formatMessage(formMessages.invalidEmail))
      .required(formatMessage(formMessages.required)),
    extension: yup.string().required(formatMessage(formMessages.required)),
    position: yup.string().required(formatMessage(formMessages.required)),
    groups: yup.string().required(formatMessage(formMessages.required))
  })

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: {
      name: auth.profile.name,
      lastname: [auth.profile.fathers_name, auth.profile.mothers_name].join(
        ' '
      ),
      username: '',
      email: '',
      extension: '',
      position: '',
      groups: []
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
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
            <Typography variant="body1">{auth.profile.activated}</Typography>
          </Card>
        </Grid>
        <Grid item cols={6}>
          <Card>
            <Typography variant="subtitle" style="semibold" className="mb-2">
              {formatMessage(userInfoMessages.role)}
            </Typography>
            <Typography variant="body1">{auth.profile.dependency}</Typography>
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

            <Tag label="test" className="mb-4" />

            <Tag
              label="test"
              className="text-sm py-0.5 px-3 bg-blue-50 mb-4"
              labelColorClassName=""
              roundedClassName="rounded-sm"
            />

            <Tag
              label="test"
              className="text-sm py-0.5 px-3 mb-4"
              labelColorClassName="text-primary"
              roundedClassName="rounded-full"
            />

            <Tag label="test" className="mb-4" removeAction={() => {}} />

            <Tag
              label="test"
              className="text-sm py-0.5 px-3 bg-blue-50 mb-4"
              labelColorClassName=""
              roundedClassName="rounded-sm"
              removeAction={() => {}}
            />

            <Tag
              label="test"
              className="text-sm py-0.5 px-3 mb-4"
              labelColorClassName="text-primary"
              roundedClassName="rounded-full"
              removeAction={() => {}}
            />

            <Tag
              label="test"
              className="text-sm py-0.5 px-3 mb-4"
              removeAction={() => {}}
              labelColorClassName=""
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default UserInfo
