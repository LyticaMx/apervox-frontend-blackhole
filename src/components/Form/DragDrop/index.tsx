import { ReactElement, useCallback } from 'react'
import clsx from 'clsx'
import { useIntl } from 'react-intl'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

import { messages } from './messages'

export interface Props extends DropzoneOptions {
  onChange?: (files: any) => void
}
const DragDrop = ({ onChange, ...config }: Props): ReactElement => {
  const intl = useIntl()
  const onDrop = useCallback((acceptedFiles) => {
    if (onChange) onChange(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...config
  })

  return (
    <div className="max-w-xl">
      <div
        {...getRootProps()}
        className={clsx(
          'flex justify-center w-full h-32 px-4 transition bg-white border-2  border-dashed rounded-md appearance-none cursor-pointer focus:outline-none',
          {
            'border-gray-300 hover:border-gray-400': !isDragActive,
            'border-blue-400 ': isDragActive
          }
        )}
      >
        <span className="flex items-center space-x-2">
          <CloudArrowUpIcon className="h-6 w-6" />
          <span className="font-medium text-gray-600 space-x-2">
            {intl.formatMessage(messages.label)}
            <span className="text-blue-600 underline">
              {intl.formatMessage(messages.browse)}
            </span>
          </span>
        </span>
        <input {...getInputProps()} />
      </div>
    </div>
  )
}

export default DragDrop
