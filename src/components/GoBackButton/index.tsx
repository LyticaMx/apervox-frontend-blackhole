import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import Tooltip from 'components/Tooltip'
import { actionsMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

interface Props {
  route: string
}

const GoBackButton = (props: Props): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <div className="absolute top-2 right-4 xl:right-16 2xl:right-32">
      <Tooltip
        content={formatMessage(actionsMessages.goBack)}
        floatProps={{ offset: 10, arrow: true }}
        classNames={{
          panel:
            'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
          arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
        }}
        placement="top"
      >
        <Link to={props.route} className="">
          <ArrowUturnLeftIcon className="w-5 h-5 text-secondary-gray mr-3" />
        </Link>
      </Tooltip>
    </div>
  )
}

export default GoBackButton
