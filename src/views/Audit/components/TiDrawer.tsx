import {
  CheckIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import Radio from 'components/Form/Radio'
import Typography from 'components/Typography'
import { generalMessages, platformMessages } from 'globalMessages'
import { ReactElement, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Target } from '..'
import { tiDrawerMessages } from '../messages'

interface Props {
  tiId: string
  handleFilter?: (target: Target) => void
}

const TiDrawer = (props: Props): ReactElement => {
  const { tiId, handleFilter } = props
  const { formatMessage } = useIntl()

  useEffect(() => {
    console.log(tiId)
  }, [tiId])

  return (
    <div className="w-96">
      <Typography variant="subtitle">
        {formatMessage(tiDrawerMessages.selectedTiData)}
      </Typography>
      <Typography variant="body2" className="italic mt-3">
        {formatMessage(platformMessages.tiName)}
      </Typography>
      <Typography variant="body2" className="mt-1 ml-2">
        T.I.90/2023-2
      </Typography>
      <Typography variant="body2" className="italic mt-3">
        {formatMessage(generalMessages.shift)}
      </Typography>
      <Typography variant="body2" className="mt-1 ml-2 flex items-center">
        <CheckIcon className="w-5 h-5 text-primary" />
        <span className="ml-2">Matutino</span>
      </Typography>
      <Typography variant="body2" className="italic mt-3">
        {formatMessage(generalMessages.cut)}
      </Typography>
      <Typography variant="body2" className="mt-1 ml-2 flex items-center">
        <CheckIcon className="w-5 h-5 text-primary" />
        <span className="ml-2">07:00</span>
      </Typography>
      <Typography
        variant="body2"
        style="semibold"
        className="text-primary uppercase mt-3"
      >
        {formatMessage(generalMessages.priority)}
      </Typography>
      <div className="flex gap-2">
        <Radio
          label={formatMessage(generalMessages.urgent)}
          value="Urgente"
          checked
          disabled
          name="priority"
        />
        <Radio
          label={formatMessage(generalMessages.high)}
          value="Alta"
          disabled
          name="priority"
        />
        <Radio
          label={formatMessage(generalMessages.normal)}
          value="Media"
          disabled
          name="priority"
        />
        <Radio
          label={formatMessage(generalMessages.low)}
          value="Baja"
          disabled
          name="priority"
        />
      </div>
      <Typography
        variant="body2"
        style="semibold"
        className="text-primary uppercase mt-3"
      >
        {formatMessage(generalMessages.follow)}
      </Typography>
      <Typography variant="body2" className="mt-1 ml-2">
        {formatMessage(tiDrawerMessages.linesInFollow)}
      </Typography>
      <div>
        <table>
          <thead>
            <tr className="italic text-sm text-left">
              <th className="font-normal px-2">
                {formatMessage(tiDrawerMessages.lineNumber)}
              </th>
              <th className="font-normal px-2">
                {formatMessage(platformMessages.phoneLine)}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2">1</td>
              <td className="px-2">5509876278</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Typography
        variant="body2"
        style="semibold"
        className="text-primary uppercase mt-3"
      >
        {formatMessage(generalMessages.status)}
      </Typography>
      <Typography variant="body2" className="mt-1 ml-2">
        {formatMessage(tiDrawerMessages.selectedTiStatus)}
      </Typography>
      <Typography variant="body2" className="mt-1 ml-2 italic">
        {formatMessage(generalMessages.status)}
      </Typography>
      <Typography variant="body2" className="mt-1 ml-2 flex items-center">
        <CheckIcon className="w-5 h-5 text-primary" />
        <span className="ml-2">
          {formatMessage(platformMessages.currentStatus)}
        </span>
      </Typography>
      {handleFilter && (
        <button
          className="mt-8 flex items-center group/item"
          onClick={() =>
            handleFilter({
              id: '004',
              name: 'T.I.90/2023-2',
              type: 'ti'
            })
          }
        >
          <DocumentMagnifyingGlassIcon className="w-5 h-5 text-secondary-gray group-hover/item:text-primary" />
          <p className="ml-2">
            {formatMessage(tiDrawerMessages.selectedTiHistory)}
          </p>
        </button>
      )}
    </div>
  )
}

export default TiDrawer
