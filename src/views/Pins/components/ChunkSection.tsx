import { ReactElement, useMemo, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'

import { usePins } from 'context/Pins'

import Table from 'components/Table'
import ConfirmDialog from 'components/Dialog/ConfirmDialog'
import Button from 'components/Button'
import Typography from 'components/Typography'
import Title from 'components/Title'
import { PaginationFilter } from 'types/filters'
import { generalMessages } from 'globalMessages'
import { chunkMessages } from '../messages'

const ChunkTable = (): ReactElement => {
  const { listOfChunks, actions } = usePins()
  const intl = useIntl()

  const [open, setOpen] = useState(false)
  const [nextChunkRange, setNextChunkRange] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10
  })

  useEffect(() => {
    fetchChunks()
  }, [])

  const fetchChunks = async (filters?: PaginationFilter): Promise<void> => {
    try {
      const data = await actions?.getChunks(filters)

      if (data) {
        setTotalRecords(data.size)
        setFilters((prev) => ({
          ...prev,
          page: data?.page
        }))
        setNextChunkRange(data.size * 100 + 1)
      }
    } catch (error) {}
  }

  const columns = useMemo(
    () => [
      {
        header: intl.formatMessage(generalMessages.creator),
        accessorKey: 'creator',
        cell: (info: any) => (
          <span className="font-bold"> {info.getValue()}</span>
        )
      },
      {
        header: intl.formatMessage(generalMessages.min),
        accessorKey: 'min_value'
      },
      {
        header: intl.formatMessage(generalMessages.max),
        accessorKey: 'max_value'
      }
    ],
    []
  )

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleCreateChunk = async (): Promise<void> => {
    const res = await actions?.createChunk()

    if (res) {
      handleClose()
      setNextChunkRange((prev) => prev + 100)
      actions?.getChunks()
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <Title>{intl.formatMessage(generalMessages.chunks)}</Title>
          <Typography variant="body2" className="text-gray-700 mt-2">
            {intl.formatMessage(chunkMessages.totalOfChunks)}
          </Typography>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button onClick={handleOpen} variant="contained" color="indigo">
            {intl.formatMessage(chunkMessages.addChunk)}
          </Button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <Table
              data={listOfChunks}
              columns={columns}
              paginationStyle="extended"
              manualPagination={{
                currentPage: filters.page - 1,
                totalRecords,
                onChange: (newPage) => {
                  fetchChunks({
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
        title={intl.formatMessage(chunkMessages.addChunkTitleConfirm)}
        subtitle={intl.formatMessage(chunkMessages.addChunkQuestion)}
        message={`Pins ${nextChunkRange} - ${nextChunkRange + 99}`}
        open={open}
        onAccept={handleCreateChunk}
        onCancel={handleClose}
      />
    </div>
  )
}

export default ChunkTable
