import { ReactElement } from 'react'

import Button from 'components/Button'
import clsx from 'clsx'
import { useIntl } from 'react-intl'

interface ClassNames {
  container: string
}

interface Item {
  id: string
  label: {
    id: string
    defaultMessage: string
  }
}

interface Props {
  items: Item[]
  onChange: (item_id: string) => void
  active: string // Validate correct type
  classNames?: ClassNames
}

const CustomTabs = ({
  items,
  active,
  onChange,
  classNames
}: Props): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <div className={clsx('flex gap-1 flex-wrap', classNames?.container)}>
      {items.map((item) => (
        <Button
          key={item.id}
          size="sm"
          color="indigo"
          className={clsx(active === item.id && 'bg-indigo-100')}
          onClick={() => onChange(item.id)}
        >
          {formatMessage(item.label)}
        </Button>
      ))}
    </div>
  )
}

export default CustomTabs
