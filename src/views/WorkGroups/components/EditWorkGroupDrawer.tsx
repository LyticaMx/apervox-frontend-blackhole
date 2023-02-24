import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { format } from 'date-fns'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { useFormatMessage } from 'hooks/useIntl'
import { generalMessages } from 'globalMessages'
import { workGroupsEditDrawerMessages } from '../messages'
import WorkGroupForm from './WorkGroupForm'

interface Props {
  workGroup: any
  open: boolean
  onClose?: () => void
}
const EditWorkGroupDrawer = ({
  workGroup,
  open,
  onClose
}: Props): ReactElement => {
  const getMessage = useFormatMessage(workGroupsEditDrawerMessages)
  const { formatMessage } = useIntl()

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

        <p className="text-sm leading-tight mb-4">{getMessage('subtitle')}</p>

        <span className="text-sm mb-2 text-gray-400">
          {formatMessage(generalMessages.createdOn, {
            date: format(workGroup.createdOn, 'dd/MM/yyyy - hh:mm')
          })}

          <span className="ml-2">{workGroup.createdBy}</span>
        </span>

        <span className="text-sm mb-4 text-gray-400">
          {formatMessage(generalMessages.updatedAt, {
            date: format(workGroup.updatedAt, 'dd/MM/yyyy - hh:mm')
          })}

          <span className="ml-2">{workGroup.updatedBy}</span>
        </span>

        <WorkGroupForm
          initialValues={workGroup}
          onSubmit={async (values) => {
            console.log('Update user', values)
          }}
        />
      </div>
    </Drawer>
  )
}

export default EditWorkGroupDrawer
