import { ReactElement, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

import useApi from 'hooks/useApi'
import { PaginationFilter } from 'types/filters'

const SelectPaginate = (): ReactElement => {
  const [pinSelected, setPinSelected] = useState(null)
  const [paginationFilters, setPaginationFilters] = useState<PaginationFilter>({
    limit: 20,
    page: 1
  })

  const getPinsService = useApi({
    endpoint: 'pins',
    method: 'get'
  })

  const loadOptions = async (search, loadedOptions): Promise<any> => {
    console.log('search', search) // Input typed
    console.log('loadedOptions', loadedOptions) // Prev options loaded

    const res = await getPinsService({ urlParams: paginationFilters })

    if (res) {
      setPaginationFilters((prev) => ({ ...prev, page: prev.page + 1 }))
    }

    return {
      options: res?.data.map((pin) => ({ value: pin.id, label: pin.number })),
      hasMore: res?.page_info.has_next_page
    }
  }
  return (
    <div>
      <AsyncPaginate
        value={pinSelected}
        loadOptions={loadOptions}
        onChange={(value) => setPinSelected(value)}
      />
    </div>
  )
}

export default SelectPaginate
