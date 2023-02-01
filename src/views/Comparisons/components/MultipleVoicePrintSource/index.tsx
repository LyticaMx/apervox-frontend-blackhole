import { FunnelIcon, TrashIcon } from '@heroicons/react/24/outline'
import Filter, { InputType } from 'components/Filter'
import Typography from 'components/Typography'
import { formMessages, generalMessages } from 'globalMessages'
import useApi from 'hooks/useApi'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { ResponseData } from 'types/api'
import { PaginationFilter } from 'types/filters'
import { Voiceprint } from '../..'
import {
  multipleVoicePrintSourceMessages,
  voiceprinSourceMessages
} from '../../messages'
import { GlobalFilters } from '../VoicePrintSource'
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual'
import NoData from 'components/NoData'
import VoiceprintData from './VoiceprintData'
import { format } from 'date-fns'
import Checkbox from 'components/Form/Checkbox'
import { SearchUser } from 'assets/SVG'

interface Props {
  voicePrints: Voiceprint[]
  handleVoicePrint: React.Dispatch<React.SetStateAction<Voiceprint[]>>
  single?: boolean
  receiver?: boolean
  filterDetails?: boolean
}

const MultipleVoicePrintSource = (props: Props): ReactElement => {
  const {
    voicePrints: selected,
    handleVoicePrint: setSelected,
    single = false,
    receiver = false,
    filterDetails = false
  } = props
  const { formatMessage } = useIntl()
  const voiceprintsRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLDivElement>(null)
  const fetchingRef = useRef<boolean>(false)
  const actualIdsSelectedPin = useRef<String[]>([])
  const [totalVoiceprints, setTotalVoiceprints] = useState(0)
  const [pinPaginationFilters, setPinPaginationFilters] =
    useState<PaginationFilter>({
      limit: 20,
      page: 1
    })
  const [voicePrintFilters, setvoicePrintFilters] = useState<PaginationFilter>({
    limit: -1,
    page: 1
  })
  const [globalFilters, setGlobalFilters] = useState<GlobalFilters>({
    voiceprintSource: receiver ? 'RECEIVED_AUDIO' : 'TRANSMITTED_AUDIO',
    pin: ''
  })
  const [loadedVoicePrints, setLoadedVoicePrints] = useState<Voiceprint[]>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [selectAll, setSelectAll] = useState(false)
  const getPinsService = useApi({
    endpoint: 'pins',
    method: 'get'
  })

  const getControlGroupsService = useApi({
    endpoint: 'get-audio-embeddings-detail',
    method: 'get'
  })

  const loadPins = async (search, loadedOptions): Promise<any> => {
    try {
      const response: ResponseData = await getPinsService({
        urlParams: { ...pinPaginationFilters, only_available: false }
      })
      if (response.data) {
        setPinPaginationFilters((prev) => ({ ...prev, page: prev.page + 1 }))

        return {
          options: response?.data.map((pin) => ({
            value: pin.number,
            label: pin.number
          })),
          hasMore: response?.page_info.has_next_page
        }
      }

      return {
        options: [],
        hasMore: false
      }
    } catch {
      return {
        options: [],
        hasMore: false
      }
    }
  }

  const loadVoicePrints = async (): Promise<any> => {
    try {
      fetchingRef.current = true
      const response: ResponseData = await getControlGroupsService({
        urlParams: {
          ...voicePrintFilters,
          get_by: globalFilters.voiceprintSource,
          pin_number: globalFilters.pin,
          start_time: globalFilters.start_time,
          end_time: globalFilters.end_time
        }
      })
      if (response.data) {
        setLoadedVoicePrints((old) =>
          old.concat(
            response?.data
              .map(
                // Falta poner este con los receiver options
                (datum): Voiceprint =>
                  globalFilters.voiceprintSource === 'CONTROL_GROUPS'
                    ? {
                        id: datum.group_id,
                        name: datum.uid,
                        totalAudios: datum.total_audios,
                        date: format(
                          new Date(datum.created_at),
                          'dd/MM/yyyy HH:mm:ss'
                        ),
                        voicePrintSource: globalFilters.voiceprintSource,
                        pinNumber: globalFilters.pin,
                        isoDate: datum.create_at
                      }
                    : {
                        id: datum.id_audio,
                        name: datum.name,
                        receiver: datum.reception_number,
                        date: format(
                          new Date(datum.date_call),
                          'dd/MM/yyyy HH:mm:ss'
                        ),
                        voicePrintSource: globalFilters.voiceprintSource,
                        pinNumber: globalFilters.pin,
                        isoDate: datum.date_call
                      }
              )
              .filter(
                (datum) => !actualIdsSelectedPin.current.includes(datum.id)
              ) ?? []
          )
        )
        setTotalVoiceprints(response?.page_info?.total_records ?? 0)
        setHasNextPage(false)
      } else {
        setHasNextPage(false)
      }
    } catch {
      setHasNextPage(false)
    } finally {
      fetchingRef.current = false
    }
  }

  const voiceprintsVirtualizer = useVirtualizer({
    count: loadedVoicePrints.length,
    getScrollElement: () => voiceprintsRef.current,
    estimateSize: () => 45,
    overscan: 5
  })

  const selectedVirtualizer = useVirtualizer({
    count: selected.length,
    getScrollElement: () => selectedRef.current,
    estimateSize: () => 45,
    overscan: 5
  })

  useEffect(() => {
    if (hasNextPage && globalFilters.pin !== '' && !fetchingRef.current) {
      loadVoicePrints()
    }
  }, [hasNextPage, loadVoicePrints, loadedVoicePrints.length])

  useEffect(() => {
    if (globalFilters.pin === '') return
    actualIdsSelectedPin.current = selected
      .filter((datum) => datum.pinNumber === globalFilters.pin)
      .map((item) => item.id)
    setHasNextPage(true)
    setLoadedVoicePrints([])
    setvoicePrintFilters((old) => ({ ...old, page: 1 }))
  }, [
    globalFilters.pin,
    globalFilters.voiceprintSource,
    globalFilters.start_time,
    globalFilters.end_time
  ])

  useEffect(() => {
    if (globalFilters.pin === '') return
    setSelected([])
    setSelectAll(false)
  }, [globalFilters.voiceprintSource])

  useEffect(() => {
    if (globalFilters.pin === '') return
    setSelectAll(false)
  }, [globalFilters.pin])

  const handleCheck = (checked: Voiceprint): void => {
    if (single) {
      const newLoaded = loadedVoicePrints.filter(
        (data) => data.id !== checked.id
      )
      if (selected.length > 0) setLoadedVoicePrints(newLoaded.concat(selected))
      else setLoadedVoicePrints(newLoaded)
      setSelected([checked])
    } else {
      setLoadedVoicePrints((old) => {
        const newArray = old.filter((data) => data.id !== checked.id)
        if (newArray.length === 0) setSelectAll(true)
        return newArray
      })
      setSelected((old) => old.concat([checked]))
    }
  }

  const handleUncheck = (unchecked: Voiceprint): void => {
    if (unchecked.pinNumber === globalFilters.pin) {
      setLoadedVoicePrints((old) => old.concat([unchecked]))
    }
    setSelected((old) => {
      const newArray = old.filter((data) => data.id !== unchecked.id)
      if (unchecked.pinNumber === globalFilters.pin) setSelectAll(false)
      return newArray
    })
  }

  const handleClear = (): void => {
    setLoadedVoicePrints((old) =>
      old.concat(
        selected.filter((data) => data.pinNumber === globalFilters.pin)
      )
    )
    setSelected([])
    setSelectAll(false)
  }

  const handleSelectAll = (e: any): void => {
    const checked = e.target.checked

    if (checked) {
      setSelected((old) => old.concat(loadedVoicePrints))
      setLoadedVoicePrints([])
    } else {
      setLoadedVoicePrints(
        selected.filter((datum) => datum.pinNumber === globalFilters.pin)
      )
      setSelected((old) =>
        old.filter((datum) => datum.pinNumber !== globalFilters.pin)
      )
    }

    setSelectAll(checked)
  }

  const selectedItems = selectedVirtualizer.getVirtualItems()

  return (
    <div>
      <div className="flex justify-between mb-3">
        <div>
          <Typography variant="body1">
            {formatMessage(generalMessages.source)}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            {formatMessage(voiceprinSourceMessages.selectVoiceprintSource)}
          </Typography>
        </div>
        <Filter
          items={[
            ...(!receiver
              ? [
                  {
                    title: formatMessage(
                      voiceprinSourceMessages.voiceprintSource
                    ),
                    type: 'radio' as InputType,
                    name: 'voiceprintSource',
                    items: [
                      {
                        value: 'TRANSMITTED_AUDIO',
                        label: formatMessage(generalMessages.transmittedAudio)
                      },
                      {
                        value: 'CONTROL_GROUPS',
                        label: formatMessage(generalMessages.controlGroup)
                      }
                    ],
                    wrap: false
                  }
                ]
              : []),
            {
              title: 'PIN',
              type: 'asyncSelect' as InputType,
              name: 'pin',
              wrap: false,
              asyncSearch: {
                loadOptions: loadPins,
                resetPagination: () =>
                  setPinPaginationFilters((prev) => ({ ...prev, page: 1 }))
              },
              props: {
                placeholder: formatMessage(
                  voiceprinSourceMessages.selectPinPlaceholder
                ),
                required: true
              }
            },
            {
              title: formatMessage(formMessages.startDate),
              type: 'datepicker' as InputType,
              name: 'startDate',
              wrap: false,
              cancelItems: ['startDateTime']
            },
            {
              title: formatMessage(formMessages.endDate),
              type: 'datepicker' as InputType,
              name: 'endDate',
              wrap: false,
              cancelItems: ['startDateTime']
            }
          ]}
          initialValues={globalFilters}
          onClose={() => {
            setPinPaginationFilters((prev) => ({ ...prev, page: 1 }))
          }}
          onSubmit={(vals) => {
            setGlobalFilters({
              pin: vals.pin.value,
              start_time: vals.startDate,
              end_time: vals.endDate,
              voiceprintSource: vals.voiceprintSource
            })
          }}
        >
          <button className="text-gray-500 p-2 pr-4">
            <FunnelIcon className="w-6 h-6" />
          </button>
        </Filter>
      </div>
      {filterDetails && (
        <div className="my-4">
          <span>
            {globalFilters.pin !== ''
              ? formatMessage(multipleVoicePrintSourceMessages.filterDetails, {
                  results: totalVoiceprints,
                  pin: (
                    <span className="bg-sky-100 text-sky-500 font-bold px-2 rounded">
                      {globalFilters.pin}
                    </span>
                  )
                })
              : ''}
            {globalFilters.start_time && globalFilters.end_time && (
              <span>
                {formatMessage(multipleVoicePrintSourceMessages.fromDates, {
                  from: (
                    <span className="bg-sky-100 text-sky-500 font-bold px-2 rounded">
                      {format(globalFilters.start_time, 'dd-MM-yyyy')}
                    </span>
                  ),
                  to: (
                    <span className="bg-sky-100 text-sky-500 font-bold px-2 rounded">
                      {format(globalFilters.end_time, 'dd-MM-yyyy')}
                    </span>
                  )
                })}
              </span>
            )}
            {globalFilters.start_time && !globalFilters.end_time && (
              <span>
                {formatMessage(multipleVoicePrintSourceMessages.fromDate, {
                  date: (
                    <span className="bg-sky-100 text-sky-500 font-bold px-2 rounded">
                      {format(globalFilters.start_time, 'dd-MM-yyyy')}
                    </span>
                  )
                })}
              </span>
            )}
          </span>
        </div>
      )}
      {globalFilters.pin === '' ? (
        <NoData
          icon={SearchUser as any}
          iconSize="xl"
          label={formatMessage(
            multipleVoicePrintSourceMessages.addFiltersToStart
          )}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between">
              {!single && (
                <Checkbox
                  label={formatMessage(generalMessages.all, { gender: 'male' })}
                  checked={selectAll}
                  disabled={globalFilters.pin === ''}
                  onChange={handleSelectAll}
                />
              )}
              <Typography className="text-right text-slate-600">
                {formatMessage(
                  multipleVoicePrintSourceMessages.availableVoiceprints
                )}
              </Typography>
            </div>
            <div className="h-60 overflow-y-auto w-full" ref={voiceprintsRef}>
              <div
                style={{
                  height: `${voiceprintsVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative'
                }}
              >
                {(!hasNextPage && loadedVoicePrints.length === 0) ||
                globalFilters.pin === '' ? (
                  <NoData />
                ) : (
                  voiceprintsVirtualizer
                    .getVirtualItems()
                    .map((virtualRow: VirtualItem) => (
                      <div
                        key={virtualRow.index}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`
                        }}
                      >
                        {virtualRow.index > loadedVoicePrints.length - 1 ? (
                          hasNextPage ? (
                            'Loading more...'
                          ) : null
                        ) : (
                          <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            ref={voiceprintsVirtualizer.measureElement}
                          >
                            <VoiceprintData
                              name={loadedVoicePrints[virtualRow.index].name}
                              type={
                                loadedVoicePrints[virtualRow.index]
                                  .voicePrintSource
                              }
                              receiver={
                                loadedVoicePrints[virtualRow.index].receiver
                              }
                              date={loadedVoicePrints[virtualRow.index].date}
                              totalAudios={
                                loadedVoicePrints[virtualRow.index].totalAudios
                              }
                              checked={false}
                              onClick={() =>
                                handleCheck(loadedVoicePrints[virtualRow.index])
                              }
                            />
                          </div>
                        )}
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <button
                className="h-5 w-5 ml-2 text-red-500"
                onClick={handleClear}
              >
                <TrashIcon />
              </button>
              <Typography className="text-right text-slate-600">
                {formatMessage(
                  multipleVoicePrintSourceMessages.selectedVoiceprints,
                  {
                    selectable: single ? 1 : 2,
                    total: (
                      <span className="text-slate-500 font-semibold">
                        {selected.length}
                      </span>
                    )
                  }
                )}
              </Typography>
            </div>
            <div className="h-60 overflow-y-auto" ref={selectedRef}>
              {selectedItems.length !== 0 ? (
                <div
                  style={{
                    height: selectedVirtualizer.getTotalSize(),
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${selectedItems[0].start}px)`
                    }}
                  >
                    {selectedItems.map((virtualRow: VirtualItem) => (
                      <div
                        key={virtualRow.key}
                        data-index={virtualRow.index}
                        ref={selectedVirtualizer.measureElement}
                      >
                        <VoiceprintData
                          name={selected[virtualRow.index].name}
                          type={selected[virtualRow.index].voicePrintSource}
                          receiver={selected[virtualRow.index].receiver}
                          date={selected[virtualRow.index].date}
                          totalAudios={selected[virtualRow.index].totalAudios}
                          checked
                          onClick={() =>
                            handleUncheck(selected[virtualRow.index])
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <NoData />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MultipleVoicePrintSource
