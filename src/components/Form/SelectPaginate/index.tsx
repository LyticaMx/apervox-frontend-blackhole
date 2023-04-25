import { ReactElement, ReactNode } from 'react'
import { Props as AsyncSelectProps, useAsyncSelect } from 'hooks/useAsyncSelect'
import { AsyncPaginate } from 'react-select-async-paginate'

export interface Props {
  asyncProps: AsyncSelectProps
  value: any
  onChange: (value: any) => void
  isMulti?: boolean
  placeholder?: ReactNode
  noOptionsMessage?: (obj: { inputValue: string }) => ReactNode
  loadingMessage?: (obj: { inputValue: string }) => ReactNode
  debounceTimeout?: number
}

const SelectPaginate = (props: Props): ReactElement => {
  const { asyncProps } = props
  const { loadOptions } = useAsyncSelect(asyncProps)
  return (
    <AsyncPaginate
      value={props.value}
      loadOptions={loadOptions}
      onChange={props.onChange}
      placeholder={props.placeholder}
      noOptionsMessage={props.noOptionsMessage}
      loadingMessage={props.loadingMessage}
      debounceTimeout={props.debounceTimeout}
      isMulti={props.isMulti}
    />
  )
}

export default SelectPaginate
