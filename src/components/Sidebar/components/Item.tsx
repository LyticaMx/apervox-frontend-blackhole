import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import clsx from 'clsx'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

import { Route } from 'router/routes'
import Accordion from './Accordion'
import { sidebarMessages } from 'globalMessages'

import LinkButton from './LinkButton'
import TreeButton from './TreeButton'

interface Props {
  route: Route
  pathname: string
  expanded: boolean
}

const Item = ({ route, pathname, expanded }: Props): ReactElement => {
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
        icon={route.icon ?? ExclamationTriangleIcon}
        classNames={{
          button: clsx(
            'text-sm font-medium rounded-md w-full relative before:absolute before:top-0 before:bottom-0 before:left-0 before:opacity-10 before:transition-all before:duration-500 before:rounded-md before:bg-black before:w-0 accordion-item group',
            route.modules.some((subModule) => subModule.path === pathname) ||
              route.path === pathname
              ? 'before:w-full border-r-2 border-sky-500'
              : 'hover:before:w-full'
          ),
          icon: 'w-6 h-6 text-slate-700',
          chevronIcon: 'transition-all duration-500',
          children: 'transition-all duration-500'
        }}
      >
        <TreeButton
          routeModule={route}
          pathname={pathname}
          expanded={expanded}
        />
        {visibleSubmodules.map((submodule) => (
          <TreeButton
            key={submodule.id}
            routeModule={submodule}
            pathname={pathname}
            expanded={expanded}
          />
        ))}
      </Accordion>
    )
  }

  return (
    <LinkButton routeModule={route} pathname={pathname} expanded={expanded} />
  )
}

export default Item
