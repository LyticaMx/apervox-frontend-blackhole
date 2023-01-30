import { UserIcon } from '@heroicons/react/24/outline'
import Dialog from 'components/Dialog'
import Tabs from 'components/Tabs'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { assignReceiverDialogMessages } from '../../messages'
import { Receiver } from '../../ReceiverToReceiver'
import CreateReceiver from './CreateReceiver'
import SearchReceiver from './SearchReceiver'

interface Props {
  onClose: () => void
  onAccept: (result: Receiver) => void
  audioToLink: Receiver | null
}

const AssignReceiverDialog = (props: Props): ReactElement | null => {
  const { audioToLink, onClose } = props
  const [tab, setTab] = useState<string>('search')
  const { formatMessage } = useIntl()

  useEffect(() => {
    if (!audioToLink) setTab('search')
  }, [audioToLink])

  if (!audioToLink) return null

  return (
    <Dialog open={!!audioToLink} onClose={onClose} size="sm" overflow="visible">
      <div className="px-5">
        <div className="mb-5 px-4 flex flex-col items-center text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-12 sm:w-12">
            <UserIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
        </div>
        <Tabs
          actualTab={tab}
          tabs={[
            {
              id: 'search',
              name: formatMessage(assignReceiverDialogMessages.assignReceiver),
              component: (
                <SearchReceiver
                  audioToLink={audioToLink}
                  changeTab={() => setTab('create')}
                  onClose={onClose}
                />
              )
            },
            {
              id: 'create',
              name: formatMessage(assignReceiverDialogMessages.createReceiver),
              component: <CreateReceiver onClose={onClose} />
            }
          ]}
          defaultTab={tab}
          onChangeTab={setTab}
        />
      </div>
    </Dialog>
  )
}

export default AssignReceiverDialog
