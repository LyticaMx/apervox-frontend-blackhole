import Form from 'components/Form'
import Typography from 'components/Typography'
import { FormikConfig } from 'formik'
import { ReactElement, useMemo } from 'react'
import { Field, Section } from 'types/form'
import Biometrics from './Biometrics'
import { useIntl } from 'react-intl'
import { biometricFormMessages } from 'views/Techniques/messages'

export interface FormValues {
  fingerprints: File[]
  voiceprints: File[]
  photos: File[]
}

interface BiometricFormProps {
  initialValues?: FormValues
}

const BiometricForm = (props: BiometricFormProps): ReactElement => {
  const { initialValues } = props
  const { formatMessage } = useIntl()
  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        fingerprints: initialValues?.fingerprints ?? [],
        voiceprints: initialValues?.voiceprints ?? [],
        photos: initialValues?.photos ?? []
      },
      onSubmit: (values) => {
        console.log(values)
      }
    }),
    [initialValues]
  )

  const sections: Section[] = [
    {
      name: 'photos',
      title: {
        text: formatMessage(biometricFormMessages.photos),
        className: 'text-primary uppercase mt-2'
      }
    },
    {
      name: 'fingerprints',
      title: {
        text: formatMessage(biometricFormMessages.fingerprints),
        className: 'text-primary uppercase mt-2'
      }
    },
    {
      name: 'voiceprints',
      title: {
        text: formatMessage(biometricFormMessages.voiceprints),
        className: 'text-primary uppercase mt-2'
      }
    }
  ]

  const fields: Array<Field<FormValues>> = [
    {
      name: 'photos',
      type: 'custom',
      children: Biometrics,
      section: 'photos'
    },
    {
      name: 'fingerprints',
      type: 'custom',
      children: Biometrics,
      section: 'fingerprints'
    },
    {
      name: 'voiceprints',
      type: 'custom',
      children: Biometrics,
      section: 'voiceprints'
    }
  ]

  return (
    <div className="w-full">
      <Typography variant="title" style="bold" className="uppercase mb-2">
        {formatMessage(biometricFormMessages.title)}
      </Typography>
      <div className="bg-white p-2 py-4 rounded-md">
        <Form
          formikConfig={formikConfig}
          fields={fields}
          submitButtonPosition="right"
          submitButtonLabel="Guardar"
          submitButtonProps={{
            color: 'indigo',
            variant: 'contained'
          }}
          withSections={{
            sections
          }}
        />
      </div>
    </div>
  )
}

export default BiometricForm
