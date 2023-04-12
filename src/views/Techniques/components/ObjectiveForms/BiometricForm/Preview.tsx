import { XMarkIcon } from '@heroicons/react/24/outline'
import { ReactElement, useEffect, useState } from 'react'
import { BsSoundwave } from 'react-icons/bs'

interface PreviewProps {
  type: 'image' | 'audio'
  file: File
  remove: () => void
}

const Preview = (props: PreviewProps): ReactElement => {
  const { file, type, remove } = props
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (type === 'audio') return

    const url = URL.createObjectURL(file)
    setPreview(url)

    return () => {
      URL.revokeObjectURL(url)
      setPreview(null)
    }
  }, [file, type])

  if (type === 'audio') {
    return (
      <div className="border border-secondary-gray p-1 rounded-md">
        <BsSoundwave className="w-10 h-10" />
      </div>
    )
  }

  return (
    <div
      className="w-20 h-20 bg-center bg-no-repeat bg-cover relative"
      style={{ backgroundImage: preview ? `url(${preview})` : '' }}
    >
      <XMarkIcon
        className="w-4 h-4 absolute top-0 right-0 cursor-pointer text-white mix-blend-difference"
        onClick={remove}
      />
    </div>
  )
}

export default Preview
