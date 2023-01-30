import { ReactElement, useEffect, useState } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'

interface Tab {
  id: string
  name: string
  icon?: any
  component: ReactElement
  to?: string
}

interface Props {
  tabs: Tab[]
  defaultTab?: string
  onChangeTab?: (newCurrent: string) => void
  isRouterNavigable?: boolean
  actualTab?: string
}

const Tabs = ({
  tabs,
  defaultTab,
  onChangeTab,
  isRouterNavigable,
  actualTab
}: Props): ReactElement => {
  const history = useHistory()

  const [current, setCurrent] = useState(defaultTab ?? tabs[0].id)

  const onChange = (newCurrent: string, to?: string): void => {
    if (isRouterNavigable && to) {
      history.push(to)
    } else {
      setCurrent(newCurrent)
      if (onChangeTab) {
        onChangeTab(newCurrent)
      }
    }
  }

  useEffect(() => {
    if (actualTab) setCurrent(actualTab)
  }, [actualTab])

  const currentTab = tabs.find((tab) => tab.id === current)

  const content = currentTab?.component ?? tabs[0].component

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.id === current)?.name}
          onChange={(e) => console.log(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button key={tab.name} onClick={() => onChange(tab.id, tab.to)}>
                <div
                  className={clsx(
                    tab.id === current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.id === current ? 'page' : undefined}
                >
                  {tab.icon && (
                    <tab.icon
                      className={clsx(
                        tab.id === current
                          ? 'text-indigo-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        '-ml-0.5 mr-2 h-5 w-5'
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span>{tab.name}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default Tabs
