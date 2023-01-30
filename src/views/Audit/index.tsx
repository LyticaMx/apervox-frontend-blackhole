import { ReactElement, useEffect, useState } from 'react'
import Title from 'components/Title'
import { LightBulbIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Typography from 'components/Typography'
import { useIntl } from 'react-intl'
import { auditMessages } from './messages'
import { actionsMessages, formMessages } from 'globalMessages'
import { useAudit } from 'context/Audit'
import Card from 'components/Card'
import { format } from 'date-fns'
import NoData from 'components/NoData'
import Divider from 'components/Divider'
import { useAsyncSelect } from 'hooks/useAsyncSelect'
import ActionCard from './components/ActionCard'
import Label from 'components/Label'
import { AsyncPaginate } from 'react-select-async-paginate'
import Pagination from 'components/Table/Pagination'
import { DateFilter } from 'types/filters'
import { PaginationParams } from 'types/api'
import RangeFilterContext from 'components/RangeFilterContext'
import { useDatesFilter } from 'context/DatesFilter'

const Audit = (): ReactElement => {
  const { message, dates } = useDatesFilter()
  const [user, setUser] = useState<any>(null)
  const [searched, setSearched] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const { listOfAudits, auditPagination, actions } = useAudit()

  const updateGlobalFilters = (dateFilters): void => {
    actions?.setGlobalFilters(dateFilters)
    setSearched(false)
  }

  const { loadOptions, resetPaginate } = useAsyncSelect({
    api: { endpoint: 'users/get-all-users', method: 'get' },
    value: 'id',
    customLabel: (item) =>
      `${String(item.profile.first_name)} ${String(
        item.profile.fathers_name
      )} ${String(item.profile.mothers_name)}`
  })

  const fetchAudits = async (
    params: DateFilter & PaginationParams
  ): Promise<void> => {
    if (!user) return
    setSearched(true)
    await actions?.getListOfAudits({ id: user.value, ...params })
  }

  useEffect(() => {
    actions?.resetList()
    setSearched(false)
  }, [user])

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div>
            <Title>{formatMessage(auditMessages.title)}</Title>
            <Typography variant="body2" style="light">
              {formatMessage(auditMessages.subtitle, {
                bold: <span className="font-semibold">Grigori</span>
              })}
            </Typography>
            <Typography variant="body2" style="light">
              {message}
            </Typography>
          </div>
          <RangeFilterContext onSubmit={updateGlobalFilters} />
        </div>
        <Card className="mt-10">
          <div className="p-4 bg-slate-100 rounded-md">
            <Typography variant="subtitle" style="semibold">
              {formatMessage(auditMessages.selectUserAndDate)}
            </Typography>
            <div className="flex items-center">
              <LightBulbIcon className="w-5 h-5 text-sky-500 mr-1" />
              <Typography variant="caption" style="light">
                {formatMessage(auditMessages.helperText)}
              </Typography>
            </div>
          </div>
          <div className="flex justify-between items-end mt-6">
            <div className="w-80">
              <Label id="names">{formatMessage(formMessages.names)}</Label>
              <AsyncPaginate
                id="names"
                value={user}
                onChange={(item) => setUser(item)}
                loadOptions={loadOptions}
                onMenuClose={resetPaginate}
                placeholder={formatMessage(auditMessages.selectPlaceholder)}
              />
            </div>
            <Button
              variant="contained"
              color="indigo"
              onClick={async () => await fetchAudits({ page: 1 })}
              disabled={!user}
              margin="none"
            >
              {formatMessage(actionsMessages.consult)}
            </Button>
          </div>
          <div className="flex justify-end items-center mt-3">
            {searched && (
              <div className="mr-auto">
                <Typography variant="body2">
                  {user?.label &&
                    formatMessage(auditMessages.actionsOf, {
                      actions: auditPagination.totalRecords,
                      of: (
                        <span className="bg-sky-100 text-sky-500 px-2 py-1 rounded-md">
                          {user?.label}
                        </span>
                      )
                    })}{' '}
                  {dates.start_time &&
                    dates.end_time &&
                    formatMessage(auditMessages.fromDates, {
                      from: (
                        <span className="bg-sky-100 text-sky-500 px-2 py-1 rounded-md">
                          {format(dates.start_time, 'dd/MM/yyyy')}
                        </span>
                      ),
                      to: (
                        <span className="bg-sky-100 text-sky-500 px-2 py-1 rounded-md">
                          {format(dates.end_time, 'dd/MM/yyyy')}
                        </span>
                      )
                    })}
                  {dates.start_time &&
                    !dates.end_time &&
                    formatMessage(auditMessages.fromDate, {
                      date: (
                        <span className="bg-sky-100 text-sky-500 px-2 py-1 rounded-md">
                          {format(dates.start_time, 'dd/MM/yyyy')}
                        </span>
                      )
                    })}
                </Typography>
              </div>
            )}
          </div>
        </Card>

        <Card className="mt-6">
          <Typography variant="body1" style="light">
            {formatMessage(auditMessages.actionDetails)}
          </Typography>
          <Divider />
          <div>
            {listOfAudits.length > 0 ? (
              <div className="min-h-[18rem] grid grid-cols-2 gap-3">
                {listOfAudits.map((audit, index) => (
                  <ActionCard
                    key={`${audit.date}-${index}`}
                    method={audit.action as any}
                    date={audit.date}
                    module={audit.module}
                    params={audit.params}
                  />
                ))}
              </div>
            ) : (
              <NoData
                type="table"
                secondaryLabel={formatMessage(auditMessages.useFilters)}
              />
            )}
            <Pagination
              currentPage={auditPagination.page - 1}
              onPageChange={async (newPage) =>
                await fetchAudits({ page: newPage + 1 })
              }
              pageSize={auditPagination.limit}
              totalCount={auditPagination.totalRecords}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Audit
