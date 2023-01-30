import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import NoData from 'components/NoData'
import { generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { Param } from 'types/audit'
import { auditMessages } from '../messages'

interface Props {
  params: Param[]
}

const ActionDetail = (props: Props): ReactElement => {
  const { params } = props
  const { formatMessage } = useIntl()

  if (params.length === 0) {
    return (
      <div className="py-2">
        <NoData
          margin="none"
          icon={ArchiveBoxXMarkIcon}
          label={formatMessage(auditMessages.withoutParams)}
        />
      </div>
    )
  }
  return (
    <div className="overflow-auto max-h-[28.5rem] max-w-lg px-1 py-4">
      <div className="table w-full">
        <div className="table-row bg-slate-200">
          <div className="table-cell px-4 border-r border-r-slate-100 text-slate-600  text-center font-semibold">
            {formatMessage(generalMessages.param)}
          </div>
          <div className="table-cell text-slate-600 font-semibold text-center">
            {formatMessage(generalMessages.value)}
          </div>
        </div>
        {params.map((param) => (
          <div className="table-row" key={param.name}>
            <div className="table-cell py-2 text-center align-middle  border-b border-b-slate-300 text-slate-500">
              {param.name}
            </div>
            <div
              className={clsx(
                'table-cell border-b border-b-slate-300 align-middle py-2',
                param.type !== 'object' && 'text-center'
              )}
            >
              {param.type === 'object' ? (
                <pre
                  className={clsx(
                    'text-xs text-slate-800 whitespace-pre-wrap',
                    ((Array.isArray(param.value) && param.value.length === 0) ||
                      Object.keys(param.value).length === 0) &&
                      'text-center'
                  )}
                >
                  {JSON.stringify(param.value, null, 2)}
                </pre>
              ) : (
                <span className="text-slate-700">{`${param.value}`}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActionDetail
