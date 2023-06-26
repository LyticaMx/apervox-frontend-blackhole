import { ReactElement } from 'react'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { useFormatMessage } from 'hooks/useIntl'
import { workGroupsCreateDrawerMessages } from '../messages'
import WorkGroupForm from './WorkGroupForm'
import { useWorkGroups } from 'context/WorkGroups'
import useToast from 'hooks/useToast'

interface Props {
  open: boolean
  onClose?: () => void
}
const CreateWorkGroupDrawer = ({ open, onClose }: Props): ReactElement => {
  const getMessage = useFormatMessage(workGroupsCreateDrawerMessages)
  const { actions } = useWorkGroups()
  const { launchToast } = useToast()

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

        <WorkGroupForm
          open={open}
          onSubmit={async (values) => {
            const created = await actions?.createWorkGroup({
              name: values.name,
              description: values.description,
              userIds: values.users.map((item) => item.value),
              techniqueIds: values.techniques.map((item) => item.value)
            })
            if (created) {
              launchToast({
                title: getMessage('success'),
                type: 'Success'
              })
              onClose?.()
              await actions?.getWorkGroups({}, true)
            }
          }}
        />
      </div>
    </Drawer>
  )
}

export default CreateWorkGroupDrawer
