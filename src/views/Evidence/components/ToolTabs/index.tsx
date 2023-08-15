import clsx from 'clsx'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { NonEmptyArray } from 'types/utils'

export interface ToolTab {
  id: string
  name: string
  component: ReactElement
}

interface Props {
  tabs: NonEmptyArray<ToolTab>
  defaultTab?: string
  onChangeTab?: (id: string) => void
}

const ToolTabs = (props: Props): ReactElement => {
  const { tabs, defaultTab, onChangeTab } = props
  const [current, setCurrent] = useState(defaultTab ?? tabs[0].id)

  const currentTab = useMemo<ToolTab>(
    () => tabs.find((tab) => tab.id === current) ?? tabs[0],
    [current, tabs]
  )

  useEffect(() => {
    if (onChangeTab) {
      onChangeTab(current)
    }
  }, [current])

  return (
    <div>
      <div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={clsx(
              'mr-3 font-medium px-2 py-1 rounded-md hover:bg-[#F4F9FF] hover:text-primary',
              current === tab.id
                ? 'bg-[#F4F9FF] !text-primary'
                : 'text-secondary-gray'
            )}
            onClick={() => setCurrent(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mt-3">{currentTab.component}</div>
    </div>
  )
}

export default ToolTabs
