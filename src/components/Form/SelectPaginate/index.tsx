import { ReactElement, ReactNode } from 'react'
import { Props as AsyncSelectProps, useAsyncSelect } from 'hooks/useAsyncSelect'
import { AsyncPaginate } from 'react-select-async-paginate'
import MultiValueContainer from './MultiValueContainer'
import Label from 'components/Label'

export interface Props {
  asyncProps: AsyncSelectProps
  value: any
  onChange: (value: any) => void
  isMulti?: boolean
  label?: string
  placeholder?: ReactNode
  noOptionsMessage?: (obj: { inputValue: string }) => ReactNode
  loadingMessage?: (obj: { inputValue: string }) => ReactNode
  debounceTimeout?: number
  selectedItemsTitle?: string
  maxItems?: number
}

const SelectPaginate = (props: Props): ReactElement => {
  const { asyncProps } = props
  const { loadOptions } = useAsyncSelect(asyncProps)

  return (
    <div>
      {props.label && (
        <Label id="" labelSpacing="1">
          {props.label}
        </Label>
      )}
      <AsyncPaginate
        value={props.value}
        loadOptions={loadOptions}
        onChange={props.onChange}
        placeholder={props.placeholder}
        noOptionsMessage={props.noOptionsMessage}
        loadingMessage={props.loadingMessage}
        debounceTimeout={props.debounceTimeout}
        isMulti={props.isMulti}
        components={{
          MultiValueContainer: () => null,
          ClearIndicator: () => null
        }}
      />
      {props.isMulti && (
        <MultiValueContainer
          values={props.value}
          onChange={props.onChange}
          maxItems={props.maxItems ?? 5}
          selectedItemsTitle={props.selectedItemsTitle}
        />
      )}
    </div>
  )
}

export default SelectPaginate
