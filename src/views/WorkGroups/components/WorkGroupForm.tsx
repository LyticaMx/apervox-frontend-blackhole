import { ReactElement, useMemo, useState } from 'react'
import { FormikConfig, FormikHelpers } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import Button from 'components/Button'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import MultiChip from 'components/Form/Selectmultiple/MultiChip'
import { Field } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { useWorkGroups } from 'context/WorkGroups'
import { formMessages } from 'globalMessages'
import { workGroupsFormMessages } from '../messages'

interface FormValues {
  name: string
  description: string
}

interface Props {
  initialValues?: FormValues | any
  onSubmit: (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => Promise<void>
}

const WorkGroupForm = ({ initialValues, onSubmit }: Props): ReactElement => {
  const getMessage = useFormatMessage(formMessages)
  const getLocalFormMessage = useFormatMessage(workGroupsFormMessages)
  const getGlobalMessage = useGlobalMessage()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedTechniques, setSelectedTechniques] = useState([])
  const { users, techniques } = useWorkGroups()

  if (!users || !techniques) return <></>

  const fields: Array<Field<FormValues>> = [
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
        placeholder: getMessage('description'),
        multiline: true,
        rows: 4
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'custom',
      name: 'users',
      children: (
        <div className="mt-8">
          <Typography
            variant="body2"
            style="medium"
            className="uppercase text-primary-500"
          >
            {getGlobalMessage('users', 'generalMessages')}
          </Typography>

          <Typography variant="body2" className="mb-2">
            {getLocalFormMessage('usersMessage')}
          </Typography>

          <Grid spacing={1} className="items-end">
            <Grid item xs={12}>
              <MultiChip
                label={getMessage('users')}
                selected={selectedUsers}
                onChange={setSelectedUsers}
                onNewOption={(newOption: string) =>
                  console.log('options', newOption)
                }
                items={users}
                textField="name"
                valueField="id"
                chipProps={{
                  variant: 'caption',
                  className: 'bg-primary-50'
                }}
              />
            </Grid>
            <Grid item xs={12} className="text-right">
              <Button
                className="text-center mt-1"
                margin="none"
                color="primary"
                variant="contained"
                onClick={() => {
                  console.log('Assigning users', selectedUsers)
                }}
              >
                {getGlobalMessage('assign', 'actionsMessages')}
              </Button>
            </Grid>
          </Grid>
        </div>
      ),
      breakpoints: { xs: 12 }
    },
    {
      type: 'custom',
      name: 'techniques',
      children: (
        <div className="mt-4">
          <Typography
            variant="body2"
            style="medium"
            className="uppercase text-primary-500"
          >
            {getGlobalMessage('techniques', 'platformMessages')}
          </Typography>

          <Typography variant="body2" className="mb-2">
            {getLocalFormMessage('techniquesMessage')}
          </Typography>
          <Grid spacing={1} className="items-end">
            <Grid item xs={12}>
              <MultiChip
                label={getMessage('techniques')}
                selected={selectedTechniques}
                onChange={setSelectedTechniques}
                onNewOption={(newOption: string) =>
                  console.log('options', newOption)
                }
                items={techniques}
                textField="name"
                valueField="id"
                chipProps={{
                  variant: 'caption',
                  className: 'bg-primary-50'
                }}
              />
            </Grid>
            <Grid item xs={12} className="text-right">
              <Button
                className="text-center mt-1"
                margin="none"
                color="primary"
                variant="contained"
                onClick={() => {
                  console.log('Assigning techniques', selectedTechniques)
                }}
              >
                {getGlobalMessage('assign', 'actionsMessages')}
              </Button>
            </Grid>
          </Grid>
        </div>
      ),
      breakpoints: { xs: 12 }
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
        description: initialValues?.description ?? ''
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
      />
    </div>
  )
}

export default WorkGroupForm
