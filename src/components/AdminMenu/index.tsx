import { ReactElement } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline'

import { pathRoute } from 'router/routes'
import clsx from 'clsx'

import { useGlobalMessage } from 'hooks/useIntl'
import Title from 'components/Title'

const AdminMenu = (): ReactElement => {
  const history = useHistory()
  const location = useLocation()
  const getMessage = useGlobalMessage()

  const items = [
    {
      text: getMessage('users', 'generalMessages'),
      icon: UserIcon,
      to: pathRoute.admin.users
    },
    {
      text: getMessage('dependencies', 'generalMessages'),
      icon: BuildingOfficeIcon,
      to: pathRoute.admin.dependencies
    }
  ]

  const itemClass = (to: string): string => {
    if (location.pathname === to) return 'border-indigo-500 text-indigo-600'

    return 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
  }

  return (
    <div className="border-b border-gray-200">
      <Title variant="page">{getMessage('admin', 'sidebarMessages')}</Title>
      <nav className="-mb-px flex space-x-5" aria-label="Tabs">
        {items.map((item, index) => (
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

export default AdminMenu
