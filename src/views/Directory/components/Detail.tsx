import { ReactElement } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

import Tabs from 'components/Tabs'

import Profile from './Profile'
import ProfileBanner from './Banner'
import ActivityDirectory from './ActivityPanel'
import Button from 'components/Button'
import Typography from 'components/Typography'
import { useIntl } from 'react-intl'
import { generalMessages } from 'globalMessages'

interface Props {
  closeDetail?: () => void
}

const Detail = ({ closeDetail }: Props): ReactElement => {
  const intl = useIntl()
  const tabs = [
    {
      id: 'profile',
      name: intl.formatMessage(generalMessages.profile),
      component: <Profile />
    },
    {
      id: 'activity',
      name: intl.formatMessage(generalMessages.activity),
      component: <ActivityDirectory />
    }
  ]

  return (
    <div
      className="w-full overflow-y-auto"
      style={{
        maxHeight: 'calc(100vh - 180px)'
      }}
    >
      <Button onClick={closeDetail} className="lg:hidden my-3">
        <ChevronLeftIcon
          className="-ml-2 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <Typography variant="body2">
          {intl.formatMessage(generalMessages.directory)}
        </Typography>
      </Button>
      <ProfileBanner />
      <div className="mt-6 sm:mt-2 2xl:mt-5 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
}

export default Detail
