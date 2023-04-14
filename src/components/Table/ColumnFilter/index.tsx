import { ReactElement } from 'react'
import DynamicFilter from '../DynamicFilter'
import StaticFilter from '../StaticFilter'
import { ReadOnlyNonEmptyArray } from 'types/utils'
import { OnChangeTableFilter, TableFilterOption } from 'types/table'

interface Props {
  optionsTitle?: string
  options?: ReadOnlyNonEmptyArray<TableFilterOption>
  apiBackend?: string
  onChange: OnChangeTableFilter
}

const ColumnFilter = (props: Props): ReactElement => {
  if (props.options) return <StaticFilter {...props} options={props.options} /> // si lo envio sólo con el spread operator tira error

  return <DynamicFilter {...props} apiBackend={props.apiBackend ?? ''} />
}

export default ColumnFilter