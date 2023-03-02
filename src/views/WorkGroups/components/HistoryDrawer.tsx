import { ReactElement } from 'react'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import { useFormatMessage } from 'hooks/useIntl'
import { useWorkGroups } from 'context/WorkGroups'
import Accordion from 'components/Accordion'
import Drawer from 'components/Drawer'
import NoData from 'components/NoData'
import Typography from 'components/Typography'
import { workGroupsHistoryDrawerMessages } from '../messages'

interface Props {
  open: boolean
  onClose?: () => void
}
const HistoryDrawer = ({ open, onClose }: Props): ReactElement => {
  const getGeneralMessage = useFormatMessage(generalMessages)
  const getMessage = useFormatMessage(workGroupsHistoryDrawerMessages)

  const { history } = useWorkGroups()

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      className="bg-background-secondary"
    >
      <div className="w-80 h-full flex flex-col px-2">
        <Typography variant="title" style="bold" className="uppercase">
          {getMessage('title')}
        </Typography>

        <Typography
          variant="body1"
          className="uppercase text-primary-500"
          noWrap
        >
          {getMessage('subtitle')}
        </Typography>

        <p className="text-sm leading-tight mt-2 mb-4">
          {getMessage('message')}
        </p>

        {history.length > 0 ? (
          history.map((historyItem, index) => (
            <Accordion
              key={index}
              useCustomTitle
              title={
                <div className="flex justify-between w-full pr-2">
                  <Typography variant="caption">
                    {historyItem.action}
                  </Typography>
                  <Typography variant="caption">
                    {format(new Date(historyItem.created_at), 'dd/MM/yyyy')}
                  </Typography>
                </div>
              }
              classNames={{
                button: 'bg-white mt-1 rounded-md items-center rounded-b-none',
                chevronIcon: 'text-primary-500'
              }}
            >
              <div className="bg-white p-2 rounded-b-md">
                <div className="flex justify-between text-primary-500 mb-1">
                  <Typography variant="body2">{`${getGeneralMessage('user')}: ${
                    historyItem.user
                  }`}</Typography>
                  <Typography
                    variant="caption"
                    className="bg-primary-50  rounded-md flex items-center px-2"
                  >
                    {format(
                      new Date(historyItem.created_at),
                      'dd/MM/yyyy HH:mm'
                    )}
                  </Typography>
                </div>

                <Typography variant="caption">
                  {historyItem.description}
                </Typography>
              </div>
            </Accordion>
          ))
        ) : (
          <div className="bg-white rounded-sm">
            <NoData />
          </div>
        )}
      </div>
    </Drawer>
  )
}

export default HistoryDrawer
