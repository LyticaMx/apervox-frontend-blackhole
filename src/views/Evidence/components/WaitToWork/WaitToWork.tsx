import Typography from 'components/Typography'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { waitToWorkMessages } from 'views/Evidence/messages'
import classes from './WaitToWork.module.css'
import clsx from 'clsx'

const WaitToWork = (): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <div>
      <div className="flex h-[50vh] w-full justify-center items-center flex-col lg:pr-8">
        <Typography variant="title">
          {formatMessage(waitToWorkMessages.gettingEvidence)}
        </Typography>
        <div className={clsx(classes.loader, 'text-primary')} />
      </div>
    </div>
  )
}

export default WaitToWork
