import { ReactElement } from 'react'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { useFormatMessage } from 'hooks/useIntl'
import { workGroupsCreateDrawerMessages } from '../messages'
import WorkGroupForm from './WorkGroupForm'

interface Props {
  open: boolean
  onClose?: () => void
}
const CreateWorkGroupDrawer = ({ open, onClose }: Props): ReactElement => {
  const getMessage = useFormatMessage(workGroupsCreateDrawerMessages)

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
          onSubmit={async (values) => {
            console.log('Create workgroup', values)
          }}
        />
      </div>
    </Drawer>
  )
}

export default CreateWorkGroupDrawer
