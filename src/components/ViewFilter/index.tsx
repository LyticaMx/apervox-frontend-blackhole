import Button from 'components/Button'
import DownloadDialog from 'components/DownloadDialog'
import FilterByField, { StaticFilter } from 'components/FilterByField'
import Daterangepicker from 'components/Form/Daterangepicker'
import { useDidMountEffect } from 'hooks/useDidMountEffect'
import { ReactElement, ReactNode, useState } from 'react'
import { DocumentType, RowsQuantity } from 'types/utils'

interface Field {
  label: string
  name: string
}

interface ActionButton {
  label: string
  onClick?: () => void
  disabled?: boolean
}

interface FilterStatus {
  dateRange: [Date?, Date?]
  clearDates?: boolean
  filterByField: {
    fields: string[]
    search: string
    staticFilters?: Record<string, any>
  }
}

interface Props {
  fields: Field[]
  staticFilters?: StaticFilter[]
  onChange?: (values: FilterStatus) => void
  action?: ActionButton | ActionButton[]
  download?:
    | ((documentType: DocumentType, quantity: RowsQuantity) => void)
    | ((documentType: DocumentType, quantity: RowsQuantity) => Promise<void>)
    | ((documentType: DocumentType, quantity: RowsQuantity) => Promise<boolean>)

  initialValues?: {
    dateRange?: {
      start_time?: Date
      end_time?: Date
    }
    search?: string
    fields?: string[]
    staticFilters?: Record<string, string | string[]>
  }
}
const ViewFilter = (props: Props): ReactElement => {
  const [dateRange, setDateRange] = useState<[Date?, Date?]>(
    props.initialValues?.dateRange?.start_time &&
      props.initialValues?.dateRange?.end_time
      ? [
          props.initialValues?.dateRange?.start_time,
          props.initialValues?.dateRange?.end_time
        ]
      : []
  )
  const [filterByField, setFilterByField] = useState({
    search: props.initialValues?.search ?? '',
    fields: props.initialValues?.fields ?? [],
    staticFilters:
      props.staticFilters?.reduce<Record<string, string | string[]>>(
        (carry, item) => {
          carry[item.name] =
            props.initialValues?.staticFilters?.[item.name] ?? item.multiple
              ? []
              : ''

          return carry
        },
        {}
      ) ?? ([] as any)
  })

  // Revisar si es conveniente que se llame cada vez que entra la persona a la vista
  useDidMountEffect(() => {
    if (props.onChange) {
      props.onChange({
        dateRange,
        filterByField,
        clearDates: dateRange.length !== 2
      })
    }
  }, [dateRange, filterByField])

  const renderActions = (): ReactNode => {
    if (!props.action) return null
    if (Array.isArray(props.action)) {
      return (
        <div className="flex gap-2">
          {props.action.map((item, index) => (
            <Button
              key={`${item.label}-${index}`}
              variant="contained"
              color="primary"
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )
    }
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={props.action.onClick}
        disabled={props.action.disabled}
      >
        {props.action.label}
      </Button>
    )
  }

  return (
    <div className="flex gap-2 items-center">
      <Daterangepicker
        shadow
        value={dateRange}
        onChange={setDateRange}
        clearable
      />
      <FilterByField
        items={props.fields}
        values={filterByField}
        onSubmit={setFilterByField}
        staticFilters={props.staticFilters}
      />
      {props.download && <DownloadDialog onExport={props.download} />}
      {props.action && renderActions()}
    </div>
  )
}

export default ViewFilter
