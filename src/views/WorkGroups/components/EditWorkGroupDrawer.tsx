import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import { useFormatMessage } from 'hooks/useIntl'
import { useWorkGroups } from 'context/WorkGroups'
import Typography from 'components/Typography'
import WorkGroupForm from './WorkGroupForm'
import { workGroupsEditDrawerMessages } from '../messages'
import useToast from 'hooks/useToast'
import { useDrawer } from 'context/Drawer'

interface Props {
  actualTab: string
}
const EditWorkGroupDrawer = ({ actualTab }: Props): ReactElement | null => {
  const getMessage = useFormatMessage(workGroupsEditDrawerMessages)
  const { formatMessage } = useIntl()
  const { launchToast } = useToast()
  const { actions, selected: workGroup } = useWorkGroups()
  const { show } = useDrawer()

  if (workGroup.id === '') return null

  return (
    <div className="h-full flex flex-col px-2">
      <p className="text-sm leading-tight mb-4">{getMessage('subtitle')}</p>

      <div className="mb-4">
        <Typography
          variant="caption"
          className="text-sm mb-4 text-gray-400 font-medium"
        >
          {formatMessage(generalMessages.createdOn, {
            date: format(
              new Date(workGroup.created_at ?? ''),
              'dd/MM/yyyy - HH:mm'
            )
          })}

          <span className="ml-2">{workGroup.registered_by}</span>
        </Typography>

        {workGroup.updated_at && (
          <Typography
            variant="caption"
            className="text-sm mb-4 text-gray-400 font-medium"
          >
            {formatMessage(generalMessages.updatedAt, {
              date: format(new Date(workGroup.updated_at), 'dd/MM/yyyy - HH:mm')
            })}

            <span className="ml-2">{workGroup.updated_by}</span>
          </Typography>
        )}
      </div>

      <WorkGroupForm
        open={show}
        initialValues={{
          // id: workGroup.id,
          name: workGroup.name,
          description: workGroup.description,
          users:
            workGroup.users?.map((item) => ({
              value: item.id,
              label: item.username
            })) ?? [],
          techniques:
            workGroup.techniques?.map((item) => ({
              value: item.id,
              label: item.name
            })) ?? []
        }}
        onSubmit={async (values) => {
          const updated = await actions?.updateWorkGroup({
            id: workGroup.id,
            name: values.name,
            description: values.description,
            userIds: values.users.map((item) => item.value),
            techniqueIds: values.techniques.map((item) => item.value)
          })
          if (updated) {
            launchToast({
              title: getMessage('success'),
              type: 'Success'
            })
            await actions?.getWorkGroups()
            if (actualTab === 'users') {
              await actions?.getWorkGroupUsers({
                page: 1
              })
            }
          }
        }}
      />
    </div>
  )
}

export default EditWorkGroupDrawer
