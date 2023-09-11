import clsx from 'clsx'
import { ReactElement, useMemo } from 'react'
import { NonEmptyArray } from 'types/utils'

export interface ToolTab {
  id: string
  name: string
  component: ReactElement
}

interface Props {
  tabs: NonEmptyArray<ToolTab>
  current?: string
  onChangeTab: (id: string) => void
}

const ToolTabs = (props: Props): ReactElement => {
  const { tabs, current = tabs?.[0]?.id ?? '', onChangeTab } = props

  const currentTab = useMemo<ToolTab>(
    () => tabs.find((tab) => tab.id === current) ?? tabs[0],
    [current, tabs]
  )

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
            onClick={() => onChangeTab(tab.id)}
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
