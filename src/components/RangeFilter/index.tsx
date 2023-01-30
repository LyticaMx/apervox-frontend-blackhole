import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import Filter, { FilterItem, InputType } from 'components/Filter'

import { formMessages, timeMessages, generalMessages } from 'globalMessages'

interface Props {
  initialValues?: Record<string, any>
  values?: Record<string, any>
  items?: FilterItem[]
  onSubmit: (values: any) => any
}

const RangeFilter = ({
  items = [],
  initialValues,
  values,
  onSubmit
}: Props): ReactElement => {
  const intl = useIntl()

  return (
    <Filter
      disabledEmpty
      items={[
        {
          title: intl.formatMessage(formMessages.startDate),
          type: 'datepicker' as InputType,
          name: 'start_time',
          wrap: false,
          cancelItems: ['time']
        },
        {
          title: intl.formatMessage(formMessages.endDate),
          type: 'datepicker' as InputType,
          name: 'end_time',
          wrap: false,
          props: {
            clearable: true
          },
          cancelItems: ['time']
        },
        {
          title: 'Alog',
          type: 'divider' as InputType,
          name: 'o'
        },
        {
          title: intl.formatMessage(generalMessages.time),
          type: 'select' as InputType,
          name: 'time',
          wrap: false,
          props: {
            clearable: true
          },
          items: [
            {
              value: 12,
              text: intl.formatMessage(timeMessages.last12Hours)
            },
            {
              value: 24,
              text: intl.formatMessage(timeMessages.last24Hours)
            },
            {
              value: 48,
              text: intl.formatMessage(timeMessages.last48Hours)
            },
            {
              value: 72,
              text: intl.formatMessage(timeMessages.last72Hours)
            }
          ],
          cancelItems: ['start_time', 'end_time']
        },
        ...items
      ]}
      values={values}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  )
}

export default RangeFilter
