import { CustomFieldFunctionProps } from 'types/form'
import { FormValues } from '.'
import { ChangeEvent, ReactElement, useRef } from 'react'
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
  const formRef = useRef<HTMLFormElement>(null)

  if (!target?.id) return null

  const uploadFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.currentTarget.files
    if (!files || files.length === 0) return
    setFieldValue(name, {
      ...values[name],
      toLoad: values[name].toLoad.concat([files[0]])
    })
    formRef.current?.reset()
  }

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
            }/biometrics/${id}/thumbnail`}
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
      <form className="hidden" ref={formRef}>
        <input
          id={name}
          type="file"
          accept={name === 'voiceprints' ? 'audio/*' : 'image/*'}
          disabled={ability.cannot(ACTION.UPDATE, SUBJECT.TARGETS)}
          onChange={uploadFile}
        />
      </form>
    </div>
  )
}

export default Biometrics
