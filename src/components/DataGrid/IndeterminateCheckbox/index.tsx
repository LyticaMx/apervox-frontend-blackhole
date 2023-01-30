import { HTMLProps, ReactElement, useEffect, useRef } from 'react'

interface Props extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean
}

const IndeterminateCheckbox = (props: Props): ReactElement => {
  const { indeterminate, className = '', ...rest } = props
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!ref.current) return

    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={`${className} cursor-pointer rounded border-gray-300 text-blue-600 transition focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75`}
      {...rest}
    />
  )
}

export default IndeterminateCheckbox
