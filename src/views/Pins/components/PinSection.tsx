import { ReactElement, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import clsx from 'clsx'

import { usePins } from 'context/Pins'
import { PaginationFilter } from 'types/filters'

import Table from 'components/Table'
import ConfirmDialog from 'components/Dialog/ConfirmDialog'
import Dialog from 'components/Dialog'
import Button from 'components/Button'
import Title from 'components/Title'
import Typography from 'components/Typography'
import { generalMessages } from 'globalMessages'

import AssignSpeaker from './AssignSpeaker'
import SimulateTabs from './SimulateTabs'
import { pinsMessages } from '../messages'

export interface PaginateSelectItem {
  label: string
  value: any
}

interface PinFilters extends PaginationFilter {
  only_available: boolean
  is_active: boolean
}

const PinsTable = (): ReactElement => {
  const { listOfPins, actions } = usePins()
  const intl = useIntl()

  const [openLinkPin, setOpenLinkPin] = useState(false)
  const [pinToLink, setPinToLink] = useState<PaginateSelectItem | null>(null)
  const [pinToUnlink, setPinToUnlink] = useState<any>(null)
  const [totalRecords, setTotalRecords] = useState(0)
  const [filters, setFilters] = useState<PinFilters>({
    page: 1,
    limit: 10,
    only_available: false,
    is_active: true
  })

  useEffect(() => {
    fetchPins(filters)
  }, [])

  const fetchPins = async (pinFilters?: PinFilters): Promise<boolean> => {
    const data = await actions?.getPins(pinFilters)

    if (data) {
      setTotalRecords(data.page_info.total_records)
      setFilters((prev) => ({
        ...prev,
        page: data?.page_info.current_page,
        is_active: pinFilters?.is_active ?? prev.is_active
      }))

      return true
    }
    return false
  }

  const columns = useMemo(
    () => [
      {
        header: 'PIN',
        accessorKey: 'number',
        cell: (info: any) => (
          <span className="font-bold"> {info.getValue()}</span>
        )
      },
      {
        header: intl.formatMessage(generalMessages.status),
        accessorKey: 'available',
        cell: (info: any) => {
          const status = info.getValue()
            ? intl.formatMessage(generalMessages.available)
            : intl.formatMessage(generalMessages.assigned)
          return (
            <Typography
              className={clsx(
                info.getValue() ? 'text-green-800' : 'text-red-800'
              )}
            >
              {status}
            </Typography>
          )
        }
      },
      {
        header: intl.formatMessage(generalMessages.speaker),
        accessorKey: 'speaker',
        cell: (info: any) => {
          return (
            info.getValue() ?? intl.formatMessage(pinsMessages.withoutSpeaker)
          )
        }
      },
      ...(filters.is_active
        ? [
            {
              header: ' ',
              cell: (info: any) => {
                const row = info.row.original

                return (
                  <Button
                    variant="text"
                    color="red"
                    onClick={() => setPinToUnlink(row)}
                  >
                    Desvincular
                  </Button>
                )
              }
            }
          ]
        : [])
    ],
    [listOfPins, filters.is_active]
  )

  const closeDialog = (): void => {
    setPinToLink(null)
    setOpenLinkPin(false)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <Title>PINs</Title>
          <Typography variant="body2" className="mt-2 text-gray-700">
            {intl.formatMessage(pinsMessages.totalOfPins)}
          </Typography>
          <SimulateTabs
            onChangeCallback={async (index: number): Promise<boolean> => {
              const res = await fetchPins({
                ...filters,
                page: 1,
                is_active: index === 0
              })

              return res
            }}
          />
        </div>
        <Button
          onClick={() => setOpenLinkPin(true)}
          variant="contained"
          color="indigo"
        >
          {intl.formatMessage(pinsMessages.linkPin)}
        </Button>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <Table
              data={listOfPins}
              columns={columns}
              manualPagination={{
                currentPage: filters.page - 1,
                totalRecords,
                onChange: (newPage) => {
                  fetchPins({
                    ...filters,
                    page: newPage + 1
                  })
                }
              }}
            />
          </div>
        </div>
      </div>
      <ConfirmDialog
        message={intl.formatMessage(pinsMessages.unlinkPinAlert)}
        open={Boolean(pinToUnlink)}
        onAccept={async () => {
          const res = await actions?.deactivatePin(pinToUnlink?.speaker_id)

          if (res) {
            setPinToUnlink(null)
            fetchPins(filters)
          }
        }}
        onCancel={() => setPinToUnlink(null)}
      />
      <Dialog
        open={Boolean(openLinkPin)}
        onClose={closeDialog}
        overflow="visible"
        padding="none"
      >
        <AssignSpeaker
          pinToLink={pinToLink}
          onCancel={closeDialog}
          onAccept={async (pinId: string, speakerId: string) => {
            const res = await actions?.linkPin(pinId, speakerId)

            if (res) {
              closeDialog()
              fetchPins(filters)
            }
          }}
        />
      </Dialog>
    </div>
  )
}

export default PinsTable
