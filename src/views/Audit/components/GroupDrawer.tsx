import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'
import { generalMessages } from 'globalMessages'
import { ReactElement, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Target } from '..'
import { groupDrawerMessages, messages } from '../messages'

interface Props {
  groupId: string
  handleFilter?: (target: Target) => void
}

const GroupDrawer = (props: Props): ReactElement => {
  const { groupId, handleFilter } = props
  const { formatMessage } = useIntl()

  useEffect(() => {
    console.log(groupId)
  }, [groupId])

  return (
    <div className="w-96">
      <Typography variant="subtitle">
        {formatMessage(groupDrawerMessages.selectedGroupData)}
      </Typography>
      <p className="mt-6 block text-xs text-secondary opacity-50">
        <span className="font-semibold">
          {formatMessage(messages.created, {
            date: <span className="font-normal">22/11/2022 - 08:00</span>
          })}
          <span className="ml-2">j.martinez</span>
        </span>
      </p>
      <Typography variant="body1" className="italic mt-3">
        {formatMessage(groupDrawerMessages.workgroupName)}
      </Typography>
      <Typography variant="body1" className="mt-1 ml-2">
        Crimen organizado
      </Typography>
      <Typography variant="body1" className="italic mt-3">
        {formatMessage(generalMessages.description)}
      </Typography>
      <Typography variant="body1" className="mt-1 ml-2">
        Grupo especializado en casos referentes al crimen organizado
      </Typography>
      {handleFilter && (
        <button
          className="mt-8 flex items-center group/item"
          onClick={() =>
            handleFilter({
              id: '001',
              name: 'Crimen organizado',
              type: 'group'
            })
          }
        >
          <DocumentMagnifyingGlassIcon className="w-5 h-5 text-secondary-gray group-hover/item:text-primary" />
          <p className="ml-2">
            {formatMessage(groupDrawerMessages.groupHistory)}
          </p>
        </button>
      )}
    </div>
  )
}

export default GroupDrawer
