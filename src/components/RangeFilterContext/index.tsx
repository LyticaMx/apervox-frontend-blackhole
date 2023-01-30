import { ReactElement } from 'react'

import { useDatesFilter } from 'context/DatesFilter'

import { FilterItem } from 'components/Filter'
import RangeFilter from 'components/RangeFilter'

interface Props {
  items?: FilterItem[]
  onSubmit: (values: any) => any
}

const RangeFilterContext = ({ items = [], onSubmit }: Props): ReactElement => {
  const { form } = useDatesFilter()

  return <RangeFilter items={items} values={form} onSubmit={onSubmit} />
}

export default RangeFilterContext
