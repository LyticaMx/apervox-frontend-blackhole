import { HTMLProps, ReactElement, useEffect, useRef } from 'react'

interface Props extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean
}

const IndeterminateCheckbox = (props: Props): ReactElement => {
  const { indeterminate, className = '', onClick, ...rest } = props
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!ref.current) return

    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [indeterminate])

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void => {
    event.stopPropagation() // Se agrega para evitar errores al seleccionar una casilla
    if (onClick) onClick(event)
  }

  return (
    <input
      type="checkbox"
      ref={ref}
      className={`${className} cursor-pointer rounded border-gray-300 text-primary transition focus:ring-primary disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75`}
      onClick={handleClick}
      {...rest}
    />
  )
}

export default IndeterminateCheckbox
