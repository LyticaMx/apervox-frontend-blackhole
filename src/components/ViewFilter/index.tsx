import Button from 'components/Button'
import FilterByField from 'components/FilterByField'
import Daterangepicker from 'components/Form/Daterangepicker'
import SearchField from 'components/Form/SearchField'
import { ReactElement, useEffect, useState } from 'react'

interface Field {
  label: string
  name: string
}

interface Props {
  fields: Field[]
  onCahnge?: (values: any) => void
  onAction?: () => void
}
const ViewFilter = (props: Props): ReactElement => {
  const [dateRange, setDateRange] = useState<[Date?, Date?]>([])
  const [filterByField, setFilterByField] = useState({ search: '', fields: [] })
  const [search, setSearch] = useState('')

  const handleClickAction = (): void => {
    if (props.onAction) props.onAction()
  }
  useEffect(() => {
    if (props.onCahnge) props.onCahnge({ dateRange, filterByField, search })
  }, [dateRange, filterByField, search])

  return (
    <div className="flex gap-2 items-center">
      <Daterangepicker shadow value={dateRange} onChange={setDateRange} />
      <FilterByField
        items={props.fields}
        values={filterByField}
        onSubmit={setFilterByField}
      />
      <SearchField
        shadow
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleClickAction}>
        Crear role de usuario
      </Button>
    </div>
  )
}

export default ViewFilter
