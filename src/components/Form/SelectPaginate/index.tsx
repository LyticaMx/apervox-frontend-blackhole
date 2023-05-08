import { ReactElement, ReactNode } from 'react'
import { Props as AsyncSelectProps, useAsyncSelect } from 'hooks/useAsyncSelect'
import { AsyncPaginate } from 'react-select-async-paginate'
import MultiValueContainer from './MultiValueContainer'
import Label from 'components/Label'
import clsx from 'clsx'
import Typography from 'components/Typography'
import RequiredMarker from '../RequiredMarker'

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
  requiredMarker?: boolean
  error?: boolean
  helperText?: string
}

const SelectPaginate = (props: Props): ReactElement => {
  const { asyncProps } = props
  const { loadOptions } = useAsyncSelect(asyncProps)

  return (
    <div>
      {props.label && (
        <Label
          id=""
          labelSpacing="1"
          labelClassname={clsx({ 'text-red-500': props.error })}
        >
          {props.label}
          {props.requiredMarker && <RequiredMarker />}
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
        classNames={{
          control: () =>
            clsx(props.error && "border !border-red-500 ring-1 ring-red-500'")
        }}
      />
      {props.helperText && (
        <Typography
          variant="caption"
          className={clsx('mt-1', props.error && 'text-red-500')}
        >
          {props.helperText}
        </Typography>
      )}
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
