import { ReactElement } from 'react'
import DynamicFilter from '../DynamicFilter'
import StaticFilter from '../StaticFilter'
import { ReadOnlyNonEmptyArray } from 'types/utils'
import { OnChangeTableFilter, TableFilterOption } from 'types/table'

interface Props {
  optionsTitle?: string
  selected?: string | string[]
  options?: ReadOnlyNonEmptyArray<TableFilterOption>
  apiBackend?: string
  onChange: OnChangeTableFilter
  multiple?: boolean
}

const ColumnFilter = (props: Props): ReactElement => {
  if (props.options) {
    return (
      <StaticFilter
        {...props}
        options={props.options}
        multipleSelection={props.multiple}
        selected={props.selected}
      />
    ) // si lo envio sólo con el spread operator tira error
  }

  return <DynamicFilter {...props} apiBackend={props.apiBackend ?? ''} />
}

export default ColumnFilter
