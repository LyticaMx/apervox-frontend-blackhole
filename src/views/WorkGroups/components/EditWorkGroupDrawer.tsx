import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import { useFormatMessage } from 'hooks/useIntl'
import { useWorkGroups } from 'context/WorkGroups'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import WorkGroupForm from './WorkGroupForm'
import { workGroupsEditDrawerMessages } from '../messages'

interface Props {
  open: boolean
  onClose?: () => void
}
const EditWorkGroupDrawer = ({ open, onClose }: Props): ReactElement => {
  const getMessage = useFormatMessage(workGroupsEditDrawerMessages)
  const { formatMessage } = useIntl()

  const { selected: workGroup } = useWorkGroups()

  return !workGroup.id ? (
    <></>
  ) : (
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

        <div className="mb-4">
          <Typography variant="caption">
            {formatMessage(generalMessages.createdOn, {
              date: format(new Date(workGroup.created_at), 'dd/MM/yyyy - hh:mm')
            })}

            <span className="ml-2">{workGroup.registered_by}</span>
          </Typography>

          {workGroup.updated_at && (
            <Typography variant="caption">
              {formatMessage(generalMessages.updatedAt, {
                date: format(
                  new Date(workGroup.updated_at),
                  'dd/MM/yyyy - hh:mm'
                )
              })}

              <span className="ml-2">{workGroup.updated_by}</span>
            </Typography>
          )}
        </div>

        <WorkGroupForm
          initialValues={{
            id: workGroup.id,
            name: workGroup.name,
            description: workGroup.description
          }}
          onSubmit={async (values) => {
            console.log('Update workGroup', values)
          }}
        />
      </div>
    </Drawer>
  )
}

export default EditWorkGroupDrawer