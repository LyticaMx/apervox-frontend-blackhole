import Form from 'components/Form'
import { ReactElement } from 'react'
import { useForm } from './hooks/useForm'

const AutoForm = (): ReactElement => {
  const { fields, formikConfig, sections } = useForm()

  return (
    <div>
      <Form
        fields={fields}
        withSections={{
          sections,
          renderMainSection: true
        }}
        formikConfig={formikConfig}
        submitButtonProps={{
          variant: 'contained',
          color: 'indigo'
        }}
      />
    </div>
  )
}

export default AutoForm
