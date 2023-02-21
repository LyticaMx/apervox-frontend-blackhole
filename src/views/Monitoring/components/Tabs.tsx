import clsx from 'clsx'
import { useFormatMessage } from 'hooks/useIntl'
import { ReactElement } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { tabsMessages } from '../messages'

const Tabs = (): ReactElement => {
  const history = useHistory()
  const location = useLocation()
  const getMessage = useFormatMessage(tabsMessages)

  const isPathName = (to: string): boolean => to === location.pathname

  const classes = {
    button:
      'text-sm px-2 py-0.5 rounded-md hover:text-primary hover:bg-primary hover:bg-opacity-10',
    active: 'text-primary bg-primary bg-opacity-10',
    default: 'text-muted'
  }

  const getClass = (to: string): string =>
    clsx(classes.button, {
      [classes.default]: !isPathName(to),
      [classes.active]: isPathName(to)
    })

  return (
    <div className="mb-1 space-x-1">
      <button
        className={getClass(pathRoute.monitoring.base)}
        onClick={() => history.push(pathRoute.monitoring.base)}
      >
        {getMessage('monitoring')}
      </button>
      <button
        className={getClass(pathRoute.monitoring.history)}
        onClick={() => history.push(pathRoute.monitoring.history)}
      >
        {getMessage('history')}
      </button>
    </div>
  )
}

export default Tabs
