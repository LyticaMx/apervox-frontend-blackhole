import { CustomFieldFunctionProps } from 'types/form'
import { FormValues } from '.'
import { ReactElement } from 'react'
import Preview from './Preview'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useTechnique } from 'context/Technique'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

interface Props extends CustomFieldFunctionProps<FormValues> {
  onSyncDelete: (id: string, name: string) => Promise<void>
}

const Biometrics = (props: Props): ReactElement | null => {
  const { name, values, setFieldValue, onSyncDelete } = props
  const { target } = useTechnique()
  const ability = useAbility()

  if (!target?.id) return null

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center">
        {values[name].loaded.map((id: string) => (
          <Preview
            key={id}
            type={name === 'voiceprints' ? 'audio' : 'image'}
            id={id}
            url={`${process.env.REACT_APP_MAIN_BACKEND_URL}targets/${
              target.id ?? ''
            }/biometrics/${id}`}
            remove={async () => {
              if (ability.cannot(ACTION.DELETE, SUBJECT.TARGETS)) return
              await onSyncDelete(id, name)
            }}
          />
        ))}
        {values[name].toLoad.map((file: File, index: number) => (
          <Preview
            key={`${file.name}-${index}`}
            file={file}
            type={name === 'voiceprints' ? 'audio' : 'image'}
            remove={() => {
              if (ability.cannot(ACTION.DELETE, SUBJECT.TARGETS)) return
              setFieldValue(name, {
                ...values[name],
                toLoad: values[name].toLoad.filter(
                  (_: any, idx: number) => idx !== index
                )
              })
            }}
          />
        ))}
        <label
          htmlFor={name}
          className="border border-secondary-gray rounded-md inline-block  cursor-pointer p-2  text-secondary hover:text-primary transition-colors hover:border-primary"
        >
          <PlusCircleIcon className="w-7 h-7" />
        </label>
      </div>
      <input
        id={name}
        className="hidden"
        type="file"
        accept={name === 'voiceprints' ? 'audio/*' : 'image/*'}
        disabled={ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)}
        onChange={(e) =>
          setFieldValue(name, {
            ...values[name],
            toLoad: values[name].toLoad.concat([e.currentTarget.files?.[0]])
          })
        }
      />
    </div>
  )
}

export default Biometrics
