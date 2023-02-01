import { ComponentProps, ReactElement, ReactNode } from 'react'
import { CircleStackIcon, ChartBarIcon } from '@heroicons/react/24/solid'
import { useIntl } from 'react-intl'
import { generalMessages } from 'globalMessages'
import clsx from 'clsx'

interface Props {
  type?: 'chart' | 'table'
  label?: ReactNode
  secondaryLabel?: ReactNode
  icon?: (props: ComponentProps<'svg'>) => JSX.Element
  margin?: 'none' | 'normal' | 'extended'
  iconSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

const NoData = ({
  type,
  label,
  secondaryLabel,
  icon,
  margin = 'normal',
  iconSize = 'md'
}: Props): ReactElement => {
  const intl = useIntl()

  const marginClasses = {
    none: 'my-0',
    normal: 'my-12',
    extended: 'my-24'
  }
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    xxl: 'w-28 h-28'
  }
  const defaultIcons = {
    chart: ChartBarIcon,
    table: CircleStackIcon
  }
  const defaultMessages = {
    chart: intl.formatMessage(generalMessages.noDataChart),
    table: intl.formatMessage(generalMessages.noDataTable)
  }

  const Icon = icon ?? defaultIcons[type ?? 'table']
  const message = label ?? defaultMessages[type ?? 'table']

  return (
    <div
      className={clsx(
        'max-w-3xl flex flex-col items-center px-4 mx-auto text-center',
        marginClasses[margin]
      )}
    >
      <Icon className={clsx(sizeClasses[iconSize], 'text-blue-500')} />
      <h2 className="text-xl tracking-tight text-gray-700 sm:text-2xl">
        {message}
      </h2>
      {secondaryLabel && (
        <p className="text-sm text-gray-400 mt-3">{secondaryLabel}</p>
      )}
    </div>
  )
}

export default NoData
