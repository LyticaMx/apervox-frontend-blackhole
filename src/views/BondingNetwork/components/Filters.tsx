import { ReactElement, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useLocation } from 'react-router-dom'
import { AsyncPaginate } from 'react-select-async-paginate'

import Button from 'components/Button'
import Card from 'components/Card'
import SelectField from 'components/Form/Select'
import Title from 'components/Title'
import FiltersEmbedding from './FiltersEmbedding'
import { useBondingNetwork } from 'context/BondingNetwork'
import InfoMessage from 'components/InfoMessage'
import { useFormatMessage } from 'hooks/useIntl'
import { filtersMessages } from '../messages'
import Label from 'components/Label'

interface LocationState {
  pin: string
  id: string
  type: string
  name: string
}

const Filters = (): ReactElement => {
  const { actions, embeddingsPagination, embedding, filters } =
    useBondingNetwork()

  const getMessage = useFormatMessage(filtersMessages)
  const [similarity, setSimilarity] = useState<number>(0.85)
  const location = useLocation<LocationState>()

  const similarities = Array.from({ length: 51 }, (_, i) => {
    const value = 50 + i
    return {
      value: value / 100,
      text: `${value}%`
    }
  })

  const handleClick = (): void => {
    actions?.getBondingNetwork({
      embedding,
      similarity
    })
  }

  const loadEmbeddings = async (): Promise<any> => {
    const res = await actions?.getEmbeddings()

    return res
  }

  const initPage = async (): Promise<void> => {
    const { state } = location

    if (state?.pin) {
      await actions?.setFilters({
        get_by: state.type ?? 'RECEIVED_AUDIO',
        pin: {
          value: state.pin,
          label: state.pin
        }
      })
    }

    if (state?.id) {
      actions?.setEmbedding({ value: state.id, label: state.name ?? state.id })
    }
  }
  useEffect(() => {
    initPage()
  }, [])

  const total = embeddingsPagination.totalRecords
  const startTime = filters.start_time
    ? format(filters.start_time, 'dd-MM-yyyy')
    : ''
  const endTime = filters.end_time ? format(filters.end_time, 'dd-MM-yyyy') : ''
  const showForm = !!embedding?.value || (!!filters.pin?.value && !!total)

  return (
    <Card>
      <div className="flex justify-between mb-5">
        <div>
          <Title variant="card">{getMessage('title')}</Title>
          <InfoMessage>{getMessage('subtitle')}</InfoMessage>
          <span className="text-sm text-gray-500"></span>
        </div>
        <FiltersEmbedding />
      </div>
      {filters.pin?.value && (
        <div className="text-sm text-gray-500 mb-4">
          <p>
            {getMessage('resultsPin', {
              total,
              pin: () => (
                <span className="bg-blue-100 text-blue-500 px-3 py-1 my-2 tracking-widest text-xs rounded-full">
                  {filters.pin?.label}
                </span>
              )
            })}
            {startTime &&
              endTime &&
              getMessage('fromDates', {
                from: () => (
                  <span className="bg-blue-100 text-blue-500 px-3 py-1 my-2 tracking-widest text-xs rounded-full">
                    {startTime}
                  </span>
                ),
                to: () => (
                  <span className="bg-blue-100 text-blue-500 px-3 py-1 my-2 tracking-widest text-xs rounded-full">
                    {endTime}
                  </span>
                )
              })}

            {startTime &&
              !endTime &&
              getMessage('fromDate', {
                date: () => (
                  <span className="bg-blue-100 text-blue-500 px-3 py-1 my-2 tracking-widest text-xs rounded-full">
                    {startTime}
                  </span>
                )
              })}
          </p>
        </div>
      )}
      {showForm && (
        <div className="flex items-end gap-4">
          <div className="w-56">
            <Label id="control-groups" labelSpacing="1">
              {getMessage('pickEmbedding')}
            </Label>
            <AsyncPaginate
              loadOptions={loadEmbeddings}
              value={embedding}
              onChange={(value) => {
                actions?.setEmbedding(value)
              }}
              cacheUniqs={[
                filters.pin,
                filters.get_by,
                filters.start_time,
                filters.end_time
              ]}
              onMenuClose={() => actions?.resetPagination()}
              isDisabled={!total}
            />
          </div>
          <div className="w-32">
            <SelectField
              label={getMessage('similarity')}
              items={similarities}
              value={similarity}
              onChange={setSimilarity}
            />
          </div>
          <Button
            variant="contained"
            color="blue"
            className="ml-auto"
            onClick={handleClick}
            disabled={!embedding || !similarity}
          >
            {getMessage('generate')}
          </Button>
        </div>
      )}
    </Card>
  )
}

export default Filters
