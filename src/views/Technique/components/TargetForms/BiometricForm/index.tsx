import Form from 'components/Form'
import Typography from 'components/Typography'
import { FormikConfig, FormikContextType } from 'formik'
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { Field, Section } from 'types/form'
import Biometrics from './Biometrics'
import { useIntl } from 'react-intl'
import { biometricFormMessages } from 'views/Technique/messages'
import useTargetMeta from 'hooks/useTargetMeta'
import { useTechnique } from 'context/Technique'
import { TechniqueTabs } from 'types/technique'
import DeleteBiometric from './DeleteBiometric'
import useToast from 'hooks/useToast'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

export interface FormValues {
  fingerprints: {
    toLoad: File[]
    loaded: string[]
  }
  voiceprints: {
    toLoad: File[]
    loaded: string[]
  }
  photos: {
    toLoad: File[]
    loaded: string[]
  }
}

const BiometricForm = (): ReactElement => {
  const [biometrics, setBiometrics] = useState<FormValues>({
    fingerprints: { toLoad: [], loaded: [] },
    photos: { toLoad: [], loaded: [] },
    voiceprints: { toLoad: [], loaded: [] }
  })
  const [biometricDelete, setBiometricDelete] = useState<
    ((val: boolean | PromiseLike<boolean>) => {}) | null
  >(null)
  const { formatMessage } = useIntl()
  const { launchToast } = useToast()
  const { target, actions: techniqueActions } = useTechnique()
  const formikRef = useRef<FormikContextType<FormValues>>()
  const actions = useTargetMeta(target?.id ?? '', 'biometrics')
  const ability = useAbility()

  const handleSubmit = async (values: FormValues): Promise<void> => {
    // TODO: Revisar Biometricos
    try {
      values.photos.toLoad.forEach(async (photo) => {
        const formData = new FormData()
        formData.append('type', 'photo')
        formData.append('file', photo)
        await actions.create(formData)
      })
      values.fingerprints.toLoad.forEach(async (fingerprint) => {
        const formData = new FormData()
        formData.append('type', 'fingerprint')
        formData.append('file', fingerprint)
        await actions.create(formData)
      })
      values.voiceprints.toLoad.forEach(async (voiceprint) => {
        const formData = new FormData()
        formData.append('type', 'voice_sample')
        formData.append('file', voiceprint)
        await actions.create(formData)
      })

      await handleGet()

      launchToast({
        title: formatMessage(biometricFormMessages.savedSuccessfully),
        type: 'Success'
      })
    } catch {}
  }

  const handleGet = async (): Promise<void> => {
    try {
      const response = await actions.get()
      setBiometrics({
        fingerprints: {
          toLoad: [],
          loaded: response.data.fingerprints.map((item) => item.id)
        },
        photos: {
          toLoad: [],
          loaded: response.data.photos.map((item) => item.id)
        },
        voiceprints: {
          toLoad: [],
          loaded: response.data.voice_samples.map((item) => item.id)
        }
      })
    } catch {}
  }

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        fingerprints: biometrics.fingerprints ?? { loaded: [], toLoad: [] },
        voiceprints: biometrics.voiceprints ?? { loaded: [], toLoad: [] },
        photos: biometrics.photos ?? { loaded: [], toLoad: [] }
      },
      onSubmit: handleSubmit,
      enableReinitialize: true
    }),
    [biometrics]
  )

  const handleDelete = async (id: string, name: string): Promise<void> => {
    try {
      if (!formikRef.current) return

      const confirm = await new Promise((resolve) =>
        setBiometricDelete(() => resolve)
      )

      setBiometricDelete(null)

      if (!confirm) {
        launchToast({
          title: formatMessage(biometricFormMessages.biometricNotDeleted),
          type: 'Warning'
        })
        return
      }

      const response = await actions.delete(id)
      const values = formikRef.current.values
      formikRef.current.setFieldValue(name, {
        loaded: response.data[
          name !== 'voiceprints' ? name : 'voice_samples'
        ].map((item) => item.id),
        toLoad: values[name].toLoad
      })

      launchToast({
        title: formatMessage(biometricFormMessages.biometricDeleted),
        type: 'Success'
      })
    } catch {}
  }

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
      children: (props) => (
        <Biometrics {...props} onSyncDelete={handleDelete} />
      ),
      section: 'photos'
    },
    {
      name: 'fingerprints',
      type: 'custom',
      children: (props) => (
        <Biometrics {...props} onSyncDelete={handleDelete} />
      ),
      section: 'fingerprints'
    },
    {
      name: 'voiceprints',
      type: 'custom',
      children: (props) => (
        <Biometrics {...props} onSyncDelete={handleDelete} />
      ),
      section: 'voiceprints'
    }
  ]

  useEffect(() => {
    if (!target?.id) return
    try {
      handleGet()
    } catch {
      techniqueActions?.setActiveTab(TechniqueTabs.GENERAL_DATA)
    }
  }, [target?.id])

  return (
    <div className="w-full">
      <DeleteBiometric onAction={biometricDelete} />
      <Typography variant="title" style="bold" className="uppercase mb-2">
        {formatMessage(biometricFormMessages.title)}
      </Typography>
      <div className="bg-white p-2 py-4 rounded-md">
        <Form
          formikConfig={formikConfig}
          fields={fields}
          formikRef={formikRef}
          submitButtonPosition="right"
          submitButtonLabel="Guardar"
          submitButtonProps={{
            color: 'indigo',
            variant: 'contained',
            disabled: ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)
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
