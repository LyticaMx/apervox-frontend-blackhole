import {
  ArrowRightIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { VirtualItem, useVirtualizer } from '@tanstack/react-virtual'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Label from 'components/Label'
import NoData from 'components/NoData'
import Typography from 'components/Typography'
import { useTechnique } from 'context/Technique'
import { actionsMessages, apiMessages } from 'globalMessages'
import useApi from 'hooks/useApi'
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { PaginationFilter } from 'types/filters'
import TargetCard from './TargetCard'
import Checkbox from 'components/Form/Checkbox'
import { format } from 'date-fns'
import { techniqueUpdateMessages } from 'views/Technique/messages'

interface Props {
  onAction:
    | ((confirm: PromiseLike<string[] | null> | (string[] | null)) => void)
    | null
  startDate?: string
  endDate?: string
}

interface InnerTarget {
  id: string
  alias: string
  phone: string
  line: string
}

const StaticTargetDialog = (props: Props): ReactElement => {
  const { formatMessage } = useIntl()
  const { technique } = useTechnique()
  const [selectedTargets, setSelectedTargets] = useState<Set<String>>(new Set())
  const parentRef = useRef<HTMLDivElement>(null)
  const fetchingRef = useRef<boolean>(false)
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const lastChecked = useRef<string>('')
  const getTargets = useApi({ endpoint: 'techniques', method: 'get' })
  const [paginationFilters, setPaginationFilters] = useState<
    PaginationFilter & { total: number }
  >({
    limit: 100,
    page: 1,
    total: 0
  })
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [loadedTargets, setLoadedTargets] = useState<InnerTarget[]>([])

  const rowVirtualizer = useVirtualizer({
    count: loadedTargets.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    overscan: 10
  })

  const loadTargets = async (): Promise<void> => {
    try {
      fetchingRef.current = true
      if (!technique?.id) return

      const response = await getTargets({
        queryString: `${technique.id}/targets`,
        urlParams: {
          page: paginationFilters.page,
          limit: paginationFilters.limit,
          has_end_date: false,
          has_overflow_line: true
        }
      })

      if (response.data) {
        setPaginationFilters((prev) => ({
          ...prev,
          page: prev.page + 1,
          total: response.size
        }))

        setLoadedTargets((old) =>
          old.concat(response.data as any[]).map((target: any) => ({
            id: target.id,
            alias: target.alias,
            line: target.overflow_line.phone,
            phone: target.phone
          }))
        )

        setHasNextPage(response.size < loadTargets.length)
        return
      }

      setHasNextPage(false)
    } catch {
      setHasNextPage(false)
    } finally {
      fetchingRef.current = false
    }
  }

  const handleTargetChange = (id: string): void => {
    setSelectedTargets((old) => {
      const newSelected = new Set(old)
      if (!newSelected.has(id)) {
        newSelected.add(id)
        lastChecked.current = id
      } else {
        newSelected.delete(id)
      }

      return newSelected
    })
  }

  const toggleSelectAll = (): void => {
    setSelectAll((old) => {
      if (
        old &&
        selectedTargets.size === paginationFilters.total &&
        lastChecked.current
      ) {
        handleTargetChange(lastChecked.current)
      }
      return !old
    })
  }

  const selectedCount = useMemo(
    () => (selectAll ? paginationFilters.total : selectedTargets.size),
    [selectedTargets, selectAll]
  )

  const open = useMemo(() => Boolean(props.onAction), [props.onAction])

  useEffect(() => {
    if (!open) return
    if (hasNextPage && !fetchingRef.current) {
      loadTargets()
    }
  }, [hasNextPage, loadTargets, loadedTargets.length])

  useEffect(() => {
    if (
      paginationFilters.total > 0 &&
      selectedTargets.size === paginationFilters.total
    ) {
      setSelectAll(true)
    }
  }, [selectedTargets.size, paginationFilters.total])

  useEffect(() => {
    if (!open) {
      setPaginationFilters({
        limit: 100,
        page: 1,
        total: 0
      })
      setHasNextPage(true)
      setLoadedTargets([])
      setSelectAll(false)
      setSelectedTargets(new Set())
    }
  }, [open])

  return (
    <Dialog open={open} onClose={() => props.onAction?.(null)} size="2xl">
      <Typography
        style="semibold"
        variant="subtitle"
        className="inline-flex items-center gap-1"
      >
        <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
        {formatMessage(techniqueUpdateMessages.extendTechnique)}
      </Typography>
      <div className="flex items-center justify-center gap-2 my-1">
        <Typography
          variant="body2"
          className="text-red-500 bg-red-100 px-1.5 line-through rounded-md"
        >
          {format(new Date(props.startDate ?? 0), 'dd/MM/yyyy')}
        </Typography>
        <ArrowRightIcon className="w-4 h-4" />
        <Typography
          variant="body2"
          className="text-primary-500 bg-primary-100 px-1.5 rounded-md"
        >
          {format(new Date(props.endDate ?? 0), 'dd/MM/yyyy')}
        </Typography>
      </div>
      <Typography variant="body2">
        {formatMessage(techniqueUpdateMessages.targetsFoundOnExtension)}
      </Typography>
      <div>
        <div className="flex items-center justify-between">
          <span>
            {formatMessage(techniqueUpdateMessages.selectedTargets, {
              selected: selectedCount
            })}
          </span>
          <div className="flex items-center gap-1">
            <Label id="select-all-shared-date-objectives" labelClassname="!m-0">
              {formatMessage(actionsMessages.selectAll)}
            </Label>
            <Checkbox
              id="select-all-shared-date-objectives"
              checked={
                selectAll ||
                (paginationFilters.total > 0 &&
                  paginationFilters.total === selectedTargets.size)
              }
              onChange={toggleSelectAll}
            />
          </div>
        </div>
        <div className="h-96 overflow-y-auto" ref={parentRef}>
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative'
            }}
          >
            {!hasNextPage && loadedTargets.length === 0 ? (
              <NoData />
            ) : (
              rowVirtualizer
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
                    {virtualRow.index > loadedTargets.length - 1 ? (
                      hasNextPage ? (
                        formatMessage(apiMessages.loadingMore)
                      ) : null
                    ) : (
                      <div
                        key={virtualRow.key}
                        data-index={virtualRow.index}
                        ref={rowVirtualizer.measureElement}
                      >
                        <TargetCard
                          {...loadedTargets[virtualRow.index]}
                          selected={
                            selectedTargets.has(
                              loadedTargets[virtualRow.index].id
                            ) || selectAll
                          }
                          disabled={selectAll}
                          onChange={() =>
                            handleTargetChange(
                              loadedTargets[virtualRow.index].id
                            )
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
      <div className="flex items-center gap-2 justify-end mt-2">
        <Button
          variant="text"
          color="primary"
          onClick={() => props.onAction?.(null)}
        >
          {formatMessage(actionsMessages.cancel)}
        </Button>
        <Button
          onClick={() =>
            props.onAction?.(
              selectAll
                ? ['all']
                : Array.from(selectedTargets, (element: String) =>
                    element.toString()
                  )
            )
          }
          className="bg-red-200 !text-red-500 transition-colors hover:!bg-red-500 hover:!text-white"
        >
          {formatMessage(actionsMessages.applyChanges)}
        </Button>
      </div>
    </Dialog>
  )
}

export default StaticTargetDialog
