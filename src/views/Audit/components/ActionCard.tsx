import Popover from 'components/Popover'
import {
  BellAlertIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  DocumentIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { ReactElement, useMemo, useState } from 'react'
import ActionDetail from './ActionDetail'
import Typography from 'components/Typography'
import { Param } from 'types/audit'
import { useIntl } from 'react-intl'
import { generalMessages } from 'globalMessages'

interface Props {
  method: 'POST' | 'PUT' | 'DELETE'
  module: string
  date: string
  params: Param[]
}

const ActionCard = (props: Props): ReactElement => {
  const { method, module, date, params } = props
  const [open, setOpen] = useState(false)
  const { formatMessage } = useIntl()

  const methodClasses = {
    POST: 'bg-green-100 text-green-600',
    PUT: 'bg-orange-100 text-orange-500',
    DELETE: 'bg-red-100 text-red-600'
  }

  const ModuleIcon = useMemo(() => {
    switch (module) {
      case 'alerts':
        return BellAlertIcon
      case 'cases':
        return DocumentIcon
      default:
        return DocumentIcon
    }
  }, [module])

  return (
    <div className="px-10 py-2">
      <div className="flex items-center bg-slate-50 py-5">
        <div className="w-[20%] flex items-center justify-center">
          <div
            className={clsx('w-[75%] text-center py-2', methodClasses[method])}
          >
            {method}
          </div>
        </div>
        <div className="w-[65%]">
          <div className="flex items-center">
            <ModuleIcon className="w-6 h-6 mr-2 text-slate-500" />
            <Typography className="text-slate-500">
              {generalMessages[module]
                ? formatMessage(generalMessages[module])
                : module}
            </Typography>
          </div>
          <div className="flex items-center">
            <CalendarDaysIcon className="w-6 h-6 mr-2 text-slate-500" />
            <Typography className="text-xs">{date}</Typography>
          </div>
        </div>
        <div className="w-[15%] flex items-center justify-center">
          <Popover
            content={<ActionDetail params={params} />}
            floatProps={{
              show: open,
              placement: 'left'
            }}
            classNames={{
              panel:
                'bg-slate-50 outline-none drop-shadow-md shadow-black-100 min-w-[25rem]'
            }}
          >
            <button className="w-6 h-6 " onClick={() => setOpen((old) => !old)}>
              <ChevronDownIcon
                className={clsx(
                  'transition-transform duration-200',
                  open && 'rotate-180'
                )}
              />
            </button>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default ActionCard
