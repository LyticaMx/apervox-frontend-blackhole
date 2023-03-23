import { ReactElement } from 'react'

import Button from 'components/Button'
import clsx from 'clsx'

interface ClassNames {
  container: string
}

interface Item {
  id: string
  label: string
}

interface Props {
  items: Item[]
  onChange: (item_id: string) => void
  active: string // Validate correct type
  classNames: ClassNames
}

const CustomTabs = ({
  items,
  active,
  onChange,
  classNames
}: Props): ReactElement => {
  return (
    <div className={clsx(classNames.container)}>
      {items.map((item) => (
        <Button
          key={item.id}
          size="sm"
          color="indigo"
          className={clsx(active === item.id && 'bg-indigo-100', 'mr-2')}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}

export default CustomTabs
