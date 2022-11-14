import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import clsx from 'clsx'

import { Route } from 'router/routes'
import Accordion from 'components/Accordion'
import { sidebarMessages } from 'messages'

import LinkButton from './LinkButton'

interface Props {
  route: Route
  pathname: string
}

const Item = ({ route, pathname }: Props): ReactElement => {
  const intl = useIntl()

  const getI18Key = (key?: string): string => {
    return key ? intl.formatMessage(sidebarMessages[key]) : ''
  }

  const visibleSubmodules = route.modules.filter(
    (submodule) => submodule.sidebar
  )

  if (visibleSubmodules.length) {
    return (
      <Accordion
        title={
          route.i18ModuleKey
            ? getI18Key(route.i18ModuleKey)
            : getI18Key(route.i18Key)
        }
        icon={route.icon}
        classNames={{
          button: clsx(
            'text-white hover:bg-blue-600 focus-visible:ring-blue-100 focus-visible:ring-opacity-75',
            route.modules.some((subModule) => subModule.path === pathname) ||
              route.path === pathname
              ? 'bg-blue-800'
              : 'bg-blue-700 '
          ),
          icon: 'w-6 h-6 text-blue-300',
          children: clsx(
            (route.modules.some((subModule) => subModule.path === pathname) ||
              route.path === pathname) &&
              'bg-blue-800'
          )
        }}
      >
        <LinkButton routeModule={route} pathname={pathname} isSubmodule />
        {visibleSubmodules.map((submodule) => (
          <LinkButton
            key={submodule.id}
            routeModule={submodule}
            pathname={pathname}
            isSubmodule
          />
        ))}
      </Accordion>
    )
  }

  return <LinkButton routeModule={route} pathname={pathname} />
}

export default Item
