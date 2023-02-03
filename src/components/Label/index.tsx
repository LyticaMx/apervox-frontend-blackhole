import clsx from 'clsx'
import { ReactElement } from 'react'
import { labelFormClasses } from 'utils/classes'

interface Props {
  id: any
  children: string
  labelSpacing?: '1' | '2' | '3' | '4' | '5'
  labelClassname?: string
}

const Label = ({
  id,
  children,
  labelSpacing = '3',
  labelClassname
}: Props): ReactElement => {
  const spacingClasses = {
    1: 'mb-1',
    2: 'mb-2',
    3: 'mb-3',
    4: 'mb-4',
    5: 'mb-5'
  }

  return (
    <label
      htmlFor={id}
      className={clsx(
        'block text-sm font-medium text-gray-700',
        spacingClasses[labelSpacing],
        labelFormClasses,
        labelClassname
      )}
    >
      {children}
    </label>
  )
}

export default Label
