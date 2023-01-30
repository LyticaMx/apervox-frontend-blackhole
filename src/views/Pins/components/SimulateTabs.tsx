import { ReactElement, useState } from 'react'
import clsx from 'clsx'
import { useIntl } from 'react-intl'
import { generalMessages } from 'globalMessages'

interface Props {
  onChangeCallback: (activeItemId: number) => Promise<boolean>
}

const SimulateTabs = ({ onChangeCallback }: Props): ReactElement => {
  const intl = useIntl()

  const [activeItem, setActiveItem] = useState(0)

  const items = [
    intl.formatMessage(generalMessages.actives),
    intl.formatMessage(generalMessages.inactives)
  ]

  const itemClass = (position: number): string => {
    if (position === activeItem) return 'border-indigo-500 text-indigo-600'

    return 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
  }

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-5" aria-label="Tabs">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={async () => {
              if (await onChangeCallback(index)) {
                setActiveItem(index)
              }
            }}
            className={clsx(
              'group inline-flex items-center py-4 px-3 border-b-2 font-medium text-sm',
              itemClass(index)
            )}
          >
            <span>{item}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default SimulateTabs
