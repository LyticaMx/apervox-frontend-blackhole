import { InputHTMLAttributes, ReactElement, useCallback } from 'react'
import clsx from 'clsx'

import Label from 'components/Label'

// import { formClasses } from 'utils/classes'

export interface Props {
  id?: string
  label?: string
  type?: string
  className?: string
  name?: string
  autoComplete?: string
  required?: boolean
  value?: any
  onChange?: (element: React.ChangeEvent<HTMLInputElement>) => any
  onBlur?: (element: any) => any
  onKeyDown?: (element: any) => any
  error?: boolean
  outlined?: boolean
  helperText?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  labelSpacing?: '1' | '2' | '3' | '4' | '5'
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  ref?: React.RefObject<HTMLInputElement>
  labelClassname?: string
}

const TextField = ({
  id,
  label,
  type = 'text',
  className,
  error,
  outlined,
  helperText,
  multiline,
  rows = 5,
  labelSpacing,
  labelClassname,
  inputProps = {},
  ...props
}: Props): ReactElement => {
  const Component = useCallback(
    (props) => {
      if (multiline) {
        return (
          <textarea
            {...props}
            className={clsx('resize-none', props?.className)}
            rows={rows}
          />
        )
      }

      return <input {...props} {...inputProps} />
    },
    [multiline, rows]
  )

  return (
    <div className={className}>
      {label && (
        <Label
          id={id}
          labelSpacing={labelSpacing}
          labelClassname={labelClassname}
        >
          {label}
        </Label>
      )}
      <Component
        id={id}
        type={type}
        {...props}
        className={clsx('text-field', {
          outlined,
          'border-red-500 border-2': error
        })}
      />
      {helperText && (
        <label className="text-xs text-red-500" id={`helper-${id}`}>
          {helperText}
        </label>
      )}
    </div>
  )
}

export default TextField
