import { CustomFieldFunctionProps } from 'types/form'
import { FormValues } from '.'
import { ReactElement } from 'react'
import Preview from './Preview'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const Biometrics = (
  props: CustomFieldFunctionProps<FormValues>
): ReactElement => {
  const { name, values, setFieldValue } = props

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center">
        {values[name].map((file: File, index: number) => (
          <Preview
            key={`${file.name}-${index}`}
            file={file}
            type={name === 'voiceprints' ? 'audio' : 'image'}
            remove={() =>
              setFieldValue(
                name,
                values[name].filter((_: any, idx: number) => idx !== index)
              )
            }
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
        onChange={(e) =>
          setFieldValue(name, values[name].concat([e.currentTarget.files?.[0]]))
        }
      />
    </div>
  )
}

export default Biometrics
