import { ReactElement } from 'react'
import TextField from 'components/Form/Textfield'

interface Props {
  value: string
  placeholder: string
  onChange: (...any) => void
  onKeyPress: (...any) => void
}
const AnnotationInput = (props: Props): ReactElement => {
  const { value, onChange, onKeyPress, placeholder } = props

  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyPress}
    />
  )
}

export default AnnotationInput
