import Button from 'components/Button'
import DownloadDialog from 'components/DownloadDialog'
import FilterByField from 'components/FilterByField'
import Daterangepicker from 'components/Form/Daterangepicker'
import { ReactElement, useEffect, useState } from 'react'
import { DocumentType } from 'types/utils'

interface Field {
  label: string
  name: string
}

interface Props {
  fields: Field[]
  onChange?: (values: any) => void
  action?: {
    label: string
    onClick?: () => void
    disabled?: boolean
  }
  download?:
    | ((documentType: DocumentType) => void)
    | ((documentType: DocumentType) => Promise<void>)
    | ((documentType: DocumentType) => Promise<boolean>)
}
const ViewFilter = (props: Props): ReactElement => {
  const [dateRange, setDateRange] = useState<[Date?, Date?]>([])
  const [filterByField, setFilterByField] = useState({ search: '', fields: [] })

  const handleClickAction = (): void => {
    if (props.action?.onClick) props.action.onClick()
  }
  useEffect(() => {
    if (props.onChange) props.onChange({ dateRange, filterByField })
  }, [dateRange, filterByField])

  return (
    <div className="flex gap-2 items-center">
      <Daterangepicker shadow value={dateRange} onChange={setDateRange} />
      <FilterByField
        items={props.fields}
        values={filterByField}
        onSubmit={setFilterByField}
      />
      {props.download && <DownloadDialog onExport={props.download} />}
      {props.action && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickAction}
          disabled={props.action.disabled}
        >
          {props.action.label}
        </Button>
      )}
    </div>
  )
}

export default ViewFilter
