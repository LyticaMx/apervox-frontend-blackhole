import { ReactElement, useMemo } from 'react'

import Table from 'components/Table'
import Typography from 'components/Typography'
import Card from 'components/Card'
import { useIntl } from 'react-intl'
import { generalMessages } from 'globalMessages'
import { likehoodScaleMessages } from '../messages'

const LikelihoodScale = (): ReactElement => {
  const { formatMessage } = useIntl()

  const columns = useMemo(
    () => [
      {
        header: formatMessage(generalMessages.value),
        accessorKey: 'value'
      },
      {
        header: formatMessage(generalMessages.category),
        accessorKey: 'category'
      }
    ],
    []
  )

  const data = [
    {
      value: '1',
      category: formatMessage(generalMessages.indeterminate)
    },
    {
      value: '2 - 10',
      category: formatMessage(likehoodScaleMessages.weakSupport)
    },
    {
      value: '11 - 100',
      category: formatMessage(likehoodScaleMessages.moderateSupport)
    },
    {
      value: '101 - 1, 000',
      category: formatMessage(likehoodScaleMessages.strongModerateSupport)
    },
    {
      value: '1, 001 - 10, 000',
      category: formatMessage(likehoodScaleMessages.strongSupport)
    },
    {
      value: '10, 001 - 1, 000, 000',
      category: formatMessage(likehoodScaleMessages.veryStrongSupport)
    },
    {
      value: '> 1, 000, 000',
      category: formatMessage(likehoodScaleMessages.extremelyStrongSupport)
    }
  ]

  return (
    <Card className="bg-white">
      <Typography style="semibold" className="text-slate-700 mb-5">
        {formatMessage(likehoodScaleMessages.similarityIndex)}
      </Typography>
      <Table columns={columns} data={data} />
    </Card>
  )
}

export default LikelihoodScale
