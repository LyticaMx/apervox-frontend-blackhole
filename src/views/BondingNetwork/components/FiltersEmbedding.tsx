import Filter, { InputType } from 'components/Filter'
import { useBondingNetwork } from 'context/BondingNetwork'
import { useServices } from 'context/BondingNetwork/services'
import { useFormatMessage } from 'hooks/useIntl'
import { ReactElement, useState } from 'react'

import { ResponseData } from 'types/api'
import { PaginationFilter } from 'types/filters'
import { filtersMessages } from '../messages'

const FiltersEmbedding = (): ReactElement => {
  const { getPins } = useServices()
  const { filters, actions } = useBondingNetwork()

  const getMessage = useFormatMessage(filtersMessages)
  const [paginationFilters, setPaginationFilters] = useState<PaginationFilter>({
    limit: 20,
    page: 1
  })

  const loadPins = async (search, loadedOptions): Promise<any> => {
    try {
      const response: ResponseData = await getPins({
        urlParams: { ...paginationFilters, only_available: false }
      })
      if (response) {
        setPaginationFilters((prev) => ({ ...prev, page: prev.page + 1 }))
      }

      return {
        options: response?.data.map((pin) => ({
          value: pin.id,
          label: pin.number
        })),
        hasMore: response?.page_info.has_next_page
      }
    } catch (error) {
      return {
        options: [],
        hasMore: false
      }
    }
  }

  const items = [
    {
      title: 'PIN',
      type: 'asyncSelect' as InputType,
      name: 'pin',
      wrap: false,
      asyncSearch: {
        loadOptions: loadPins,
        resetPagination: () =>
          setPaginationFilters((prev) => ({ ...prev, page: 1 }))
      },
      props: {
        placeholder: getMessage('selectPinPlaceholder'),
        required: true
      }
    },
    {
      title: 'Tipo',
      type: 'select' as InputType,
      name: 'get_by',
      wrap: false,
      items: [
        {
          value: 'CONTROL_GROUPS',
          text: 'Grupos control'
        },
        {
          value: 'TRANSMITTED_AUDIO',
          text: 'Audios transmitidos'
        },
        {
          value: 'RECEIVED_AUDIO',
          text: 'Audios recibidos'
        }
      ]
    },
    {
      title: getMessage('startDate'),
      type: 'datepicker' as InputType,
      name: 'start_time',
      wrap: false,
      props: { clearable: true }
    },
    {
      title: getMessage('endDate'),
      type: 'datepicker' as InputType,
      name: 'end_time',
      wrap: false,
      props: { clearable: true }
    }
  ]

  const handleSubmit = (values): void => {
    actions?.setFilters({
      pin: values.pin,
      get_by: values.get_by,
      start_time: values.start_time,
      end_time: values.end_time
    })
  }

  return (
    <Filter
      items={items}
      values={filters}
      onClose={() => {
        setPaginationFilters((prev) => ({ ...prev, page: 1 }))
      }}
      onSubmit={handleSubmit}
    />
  )
}

export default FiltersEmbedding
