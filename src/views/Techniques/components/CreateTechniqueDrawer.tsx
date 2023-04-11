import { ReactElement } from 'react'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import TechniqueForm from './TechniqueForm'
import { useIntl } from 'react-intl'
import { createTechniqueDrawerMessages } from '../messages'

interface Props {
  open: boolean
  onClose?: () => void
}
const CreateTechniqueDrawer = ({ open, onClose }: Props): ReactElement => {
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
          {formatMessage(createTechniqueDrawerMessages.addTechnique)}
        </Typography>

        <Typography variant="body2" className="leading-tight mb-4">
          {formatMessage(createTechniqueDrawerMessages.completeFields)}
        </Typography>

        <TechniqueForm
          onSubmit={async (values) => {
            console.log('Create workgroup', values)
          }}
        />
      </div>
    </Drawer>
  )
}

export default CreateTechniqueDrawer
