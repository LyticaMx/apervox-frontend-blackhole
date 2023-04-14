import Button from 'components/Button'
import DownloadDialog from 'components/DownloadDialog'
import FilterByField from 'components/FilterByField'
import Daterangepicker from 'components/Form/Daterangepicker'
import { useDidMountEffect } from 'hooks/useDidMountEffect'
import { ReactElement, ReactNode, useState } from 'react'
import { DocumentType } from 'types/utils'

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
  filterByField: {
    fields: string[]
    search: string
  }
}

interface Props {
  fields: Field[]
  onChange?: (values: FilterStatus) => void
  action?: ActionButton | ActionButton[]
  download?:
    | ((documentType: DocumentType) => void)
    | ((documentType: DocumentType) => Promise<void>)
    | ((documentType: DocumentType) => Promise<boolean>)
}
const ViewFilter = (props: Props): ReactElement => {
  const [dateRange, setDateRange] = useState<[Date?, Date?]>([])
  const [filterByField, setFilterByField] = useState({ search: '', fields: [] })

  // Revisar si es conveniente que se llame cada vez que entra la persona a la vista
  useDidMountEffect(() => {
    if (props.onChange) props.onChange({ dateRange, filterByField })
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
      <Daterangepicker shadow value={dateRange} onChange={setDateRange} />
      <FilterByField
        items={props.fields}
        values={filterByField}
        onSubmit={setFilterByField}
      />
      {props.download && <DownloadDialog onExport={props.download} />}
      {props.action && renderActions()}
    </div>
  )
}

export default ViewFilter
