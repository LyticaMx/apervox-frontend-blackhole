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
import useToast from 'hooks/useToast'

interface Props {
  open: boolean
  onClose?: () => void
  actualTab: string
}
const EditWorkGroupDrawer = ({
  open,
  onClose,
  actualTab
}: Props): ReactElement | null => {
  const getMessage = useFormatMessage(workGroupsEditDrawerMessages)
  const { formatMessage } = useIntl()
  const { launchToast } = useToast()
  const { actions, selected: workGroup } = useWorkGroups()

  if (workGroup.id === '') return null

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

        <div className="mb-4">
          <Typography variant="caption">
            {formatMessage(generalMessages.createdOn, {
              date: format(
                new Date(workGroup.created_at ?? ''),
                'dd/MM/yyyy - hh:mm'
              )
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
          open={open}
          initialValues={{
            id: workGroup.id,
            name: workGroup.name,
            description: workGroup.description,
            users: workGroup.users?.map((item) => ({
              value: item.id,
              label: item.username
            }))
          }}
          onSubmit={async (values) => {
            const updated = await actions?.updateWorkGroup({
              id: workGroup.id,
              name: values.name,
              description: values.description,
              userIds: values.users.map((item) => item.value)
            })
            if (updated) {
              launchToast({
                title: getMessage('success'),
                type: 'Success'
              })
              onClose?.()
              actions?.getWorkGroups()
              if (actualTab === 'users') {
                actions?.getWorkGroupUsers({
                  page: 1
                })
              }
            }
          }}
        />
      </div>
    </Drawer>
  )
}

export default EditWorkGroupDrawer
