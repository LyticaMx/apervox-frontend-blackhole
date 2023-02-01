import { FunnelIcon } from '@heroicons/react/24/outline'
import Filter, { InputType } from 'components/Filter'
import Label from 'components/Label'
import Typography from 'components/Typography'
import { format } from 'date-fns'
import { formMessages, generalMessages } from 'globalMessages'
import useApi from 'hooks/useApi'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { AsyncPaginate } from 'react-select-async-paginate'
import { ResponseData } from 'types/api'
import { DateFilter, PaginationFilter } from 'types/filters'
import { voiceprinSourceMessages } from '../messages'

export interface GlobalFilters extends DateFilter {
  voiceprintSource: 'TRANSMITTED_AUDIO' | 'CONTROL_GROUPS' | 'RECEIVED_AUDIO'
  pin: string
}

interface Props {
  baseVoicePrint?: boolean
  voicePrint: any
  handleVoicePrint: (value: any) => void
}

const VoicePrintSource = (props: Props): ReactElement => {
  const { baseVoicePrint = false, voicePrint, handleVoicePrint } = props
  const [pinPaginationFilters, setPinPaginationFilters] =
    useState<PaginationFilter>({
      limit: 20,
      page: 1
    })
  const [voicePrintFilters, setvoicePrintFilters] = useState<PaginationFilter>({
    limit: 20,
    page: 1
  })
  const [globalFilters, setGlobalFilters] = useState<GlobalFilters>({
    voiceprintSource: 'TRANSMITTED_AUDIO',
    pin: ''
  })
  const [selected, setSelected] = useState<any>(voicePrint)
  const { formatMessage } = useIntl()

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

  const loadVoicePrints = async (search, loadedOptions): Promise<any> => {
    try {
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
        setvoicePrintFilters((prev) => ({ ...prev, page: prev.page + 1 }))
        return {
          options: response?.data.map((datum) => ({
            value: datum.id_audio ?? datum.group_id,
            label: datum.name ?? datum.uid,
            data: datum
          })),
          hasMore: response?.page_info?.has_next_page
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

  useEffect(() => {
    if (!selected) return
    if (globalFilters.voiceprintSource === 'CONTROL_GROUPS') {
      if (!selected.data) return
      handleVoicePrint({
        id: selected.value,
        name: selected.data.uid,
        totalAudios: selected.data.total_audios,
        date: format(new Date(selected.data.created_at), 'dd/MM/yyyy HH:mm:ss'),
        voicePrintSource: globalFilters.voiceprintSource
      })
    } else {
      const newVoiceprint = {
        id: selected.value,
        name: selected.data.name,
        receiver: selected.data.reception_number,
        date:
          selected.data.formated_date ??
          format(new Date(selected.data.date_call), 'dd/MM/yyyy HH:mm:ss'),
        voicePrintSource: globalFilters.voiceprintSource
      }
      // Se realiza la comparación para evitar dobles renders
      if (JSON.stringify(newVoiceprint) !== JSON.stringify(voicePrint)) {
        handleVoicePrint(newVoiceprint)
      }
    }
  }, [selected])

  useEffect(() => {
    // Para aplicar el reset
    if (!voicePrint) setSelected(null)
    else {
      // Solo se aplica para audios transmitidos
      if (voicePrint.voicePrintSource === 'TRANSMITTED_AUDIO') {
        setSelected({
          value: voicePrint.id,
          label: voicePrint.name,
          data: {
            name: voicePrint.name,
            reception_number: voicePrint.receiver,
            formated_date: voicePrint.date,
            VoicePrintSource: voicePrint.voicePrintSource
          }
        })
      }
    }
  }, [voicePrint])

  useEffect(() => {}, [globalFilters.voiceprintSource])

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
            ...(!baseVoicePrint
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
      <Label id="control-groups" labelSpacing="1">
        {formatMessage(voiceprinSourceMessages.availableVoiceprints)}
      </Label>
      <AsyncPaginate
        loadOptions={loadVoicePrints}
        value={selected}
        onChange={(value) => setSelected(value)}
        onMenuClose={() =>
          setvoicePrintFilters((prev) => ({ ...prev, page: 1 }))
        }
        cacheUniqs={[globalFilters.voiceprintSource, globalFilters.pin]}
        isDisabled={!globalFilters.pin}
      />
    </div>
  )
}

export default VoicePrintSource
