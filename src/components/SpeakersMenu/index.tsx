import { ReactElement, ComponentProps } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline'

import { pathRoute } from 'router/routes'
import clsx from 'clsx'
import { useIntl } from 'react-intl'
import { generalMessages } from 'globalMessages'

interface Item {
  text: string
  icon?: (props: ComponentProps<'svg'>) => JSX.Element
  to: string
}
interface Props {
  items?: Item[]
}

const RedirectMenu = ({ items }: Props): ReactElement => {
  const history = useHistory()
  const location = useLocation()
  const intl = useIntl()

  const localItems = [
    {
      text: intl.formatMessage(generalMessages.resume),
      icon: UserIcon,
      to: pathRoute.speakers.dashboard
    },
    {
      text: intl.formatMessage(generalMessages.directory),
      icon: BuildingOfficeIcon,
      to: pathRoute.speakers.directory
    }
  ]

  const itemsToRender = items ?? localItems

  const itemClass = (to: string): string => {
    if (location.pathname === to) return 'border-indigo-500 text-indigo-600'

    return 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
  }

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-5" aria-label="Tabs">
        {itemsToRender.map((item, index) => (
          <button
            key={index}
            onClick={() => history.push(item.to)}
            className={clsx(
              'group inline-flex items-center py-4 px-3 border-b-2 font-medium text-sm',
              itemClass(item.to)
            )}
          >
            {item.icon && <item.icon className="-ml-0.5 mr-2 h-5 w-5" />}
            <span>{item.text}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default RedirectMenu
