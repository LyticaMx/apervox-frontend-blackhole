import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import IconButton from 'components/Button/IconButton'
import Label from 'components/Label'
import { InputHTMLAttributes, ReactElement, useState } from 'react'
import { formClasses } from 'utils/classes'
import PasswordStrengthBar from 'react-password-strength-bar'
import { useIntl } from 'react-intl'
import { passwordFieldMessages } from '../messages'

export interface Props {
  id: string
  label?: string
  className?: string
  name: string
  autoComplete?: string
  required?: boolean
  value: any
  onChange: (element: any) => any
  onBlur?: (element: any) => any
  error?: boolean
  helperText?: string
  placeholder?: string
  rows?: number
  labelSpacing?: '1' | '2' | '3' | '4' | '5'
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  labelClassname?: string
  passwordStrength?: boolean
  passwordStrengthScoreWordClassName?: string
}

const PasswordField = ({
  id,
  label,
  className,
  error,
  helperText,
  rows = 5,
  labelSpacing,
  labelClassname,
  inputProps = {},
  passwordStrength,
  passwordStrengthScoreWordClassName = '',
  ...props
}: Props): ReactElement => {
  const [toggleView, setToggleView] = useState<boolean>(false)
  const { formatMessage } = useIntl()

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
      <div>
        <div className="relative">
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center pl-3">
            <IconButton
              tabIndex={-1}
              onClick={() => setToggleView((old) => !old)}
              color="indigo"
            >
              {toggleView ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </IconButton>
          </div>
          <input
            id={id}
            type={toggleView ? 'text' : 'password'}
            {...props}
            className={clsx(formClasses, 'pr-10', {
              'border-red-500 border-2': error
            })}
          />
        </div>
        {passwordStrength && (
          <PasswordStrengthBar
            password={props.value}
            scoreWords={[
              formatMessage(passwordFieldMessages.veryWeak),
              formatMessage(passwordFieldMessages.weak),
              formatMessage(passwordFieldMessages.okay),
              formatMessage(passwordFieldMessages.good),
              formatMessage(passwordFieldMessages.strong)
            ]}
            scoreWordClassName={clsx(passwordStrengthScoreWordClassName)}
            shortScoreWord={null}
          />
        )}
        {helperText && (
          <label className="text-xs text-red-500" id={`helper-${id}`}>
            {helperText}
          </label>
        )}
      </div>
    </div>
  )
}

export default PasswordField
