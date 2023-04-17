import { Float } from '@headlessui-float/react'
import { Popover } from '@headlessui/react'
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline'
import { useVirtualizer } from '@tanstack/react-virtual'
import TextField from 'components/Form/Textfield'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import { actionsMessages, generalMessages } from 'globalMessages'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { OnChangeTableFilter } from 'types/table'
import { useDebounce } from 'usehooks-ts'
// import useApi from 'hooks/useApi'

// Siempre al final
import demo from './demo'
import Checkbox from 'components/Form/Checkbox'

// TODO: Se queda el componente en espera de como se van a manejar los filtros
interface Props {
  optionsTitle?: string
  onChange: OnChangeTableFilter
  apiBackend: string
}

interface Pagination {
  page: number
  size: number
  limit: number
}

const DynamicFilter = (props: Props): ReactElement => {
  const { optionsTitle } = props
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const [fieldFilter, setFieldFilter] = useState<string>('')
  // const getFilterService = useApi({ endpoint: props.apiBackend, method: 'get' })
  const [pageInfo, setPageInfo] = useState<Pagination>({
    page: 1,
    size: 0,
    limit: 10
  })
  const [allRows, setAllRows] = useState<any[]>([])
  const listRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(fieldFilter, 300)

  const rowVirtualizer = useVirtualizer({
    count:
      pageInfo.page * pageInfo.limit < pageInfo.size
        ? allRows.length + 1
        : allRows.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 30,
    overscan: 5
  })

  const fetchNextPage = async (query: string): Promise<number> => {
    try {
      // const response = await getFilterService()

      return await new Promise((resolve) => {
        setTimeout(() => {
          const rows: any[] = query
            ? demo.filter((item) => item.name.includes(query))
            : (demo as any)
          setAllRows(rows)
          resolve(rows.length)
        }, 1500)
      })
    } catch {
      return -1
    }
  }

  useEffect(() => {
    if (openFilter) console.log(debouncedValue)
  }, [debouncedValue, openFilter])

  useEffect(() => {
    ;(async () => {
      const total = await fetchNextPage(debouncedValue)
      setPageInfo((old) => ({
        ...old,
        has_next_page: false,
        total_records: total
      }))
    })()
  }, [
    allRows.length,
    fetchNextPage,
    rowVirtualizer.getVirtualItems(),
    debouncedValue
  ])

  return (
    <Popover>
      <Float
        show={openFilter}
        placement="bottom-start"
        offset={15}
        shift={6}
        flip={10}
        portal
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Button
          as="div"
          className="ml-1 h-4"
          onClick={(e) => {
            setOpenFilter((old) => !old)
          }}
        >
          <button className="text-gray-300 hover:text-primary">
            <AdjustmentsVerticalIcon className="w-4 h-4" />
          </button>
        </Popover.Button>
        <Popover.Panel
          static
          className="bg-white border-gray-200 rounded-md shadow-lg focus:outline-none z-10 max-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <Grid spacing={2} className="p-4">
            <Grid item cols={7}>
              <Typography
                className="text-secondary text-lg uppercase"
                style="bold"
              >
                {formatMessage(generalMessages.filters)}
              </Typography>
            </Grid>
            <Grid item cols={5} className="flex max-h-6 items-start">
              <button className="text-primary mr-2 flex-none" type="button">
                {formatMessage(actionsMessages.clean)}
              </button>
              <div className="w-1 inline h-6 bg-[#00000029] rounded-md" />
              <button className="text-primary ml-2" type="submit">
                {formatMessage(actionsMessages.apply)}
              </button>
            </Grid>
            <Grid item cols={12}>
              {optionsTitle && (
                <Typography variant="body1" style="semibold" className="mb-2">
                  {optionsTitle}
                </Typography>
              )}
              <TextField
                value={fieldFilter}
                onChange={(e) => setFieldFilter(e.target.value)}
              />
              <div
                className="h-[200px] mt-2 overflow-y-auto relative w-full"
                ref={listRef}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const isLoaderRow = virtualRow.index > allRows.length - 1
                  const item = allRows[virtualRow.index]

                  return (
                    <div
                      key={virtualRow.index}
                      className="absolute top-0 left-0 w-full"
                      ref={rowVirtualizer.measureElement}
                      style={{
                        transform: `translateY(${virtualRow.start}px)`
                      }}
                    >
                      {isLoaderRow ? (
                        pageInfo.page * pageInfo.limit < pageInfo.size ? (
                          'Loading more...'
                        ) : (
                          'Nothing more to load'
                        )
                      ) : (
                        <Checkbox
                          label={item.name}
                          className="ml-2 first:mt-2"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </Grid>
          </Grid>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default DynamicFilter
