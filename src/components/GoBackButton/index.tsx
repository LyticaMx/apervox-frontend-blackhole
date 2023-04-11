import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import Tooltip from 'components/Tooltip'
import { actionsMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

interface Props {
  onClick: () => void
}

const GoBackButton = ({ onClick }: Props): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <div
      className=" bg-primary-100 p-3 justify-center items-center flex rounded-2xl cursor-pointer"
      onClick={onClick}
    >
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
        <ArrowUturnLeftIcon
          className="w-5 h-5 text-primary "
          onClick={onClick}
        />
      </Tooltip>
    </div>
  )
}

export default GoBackButton
