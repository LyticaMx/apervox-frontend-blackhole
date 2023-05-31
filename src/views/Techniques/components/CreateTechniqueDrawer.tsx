import { ReactElement } from 'react'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import TechniqueForm, { FormValues } from './TechniqueForm'
import { useIntl } from 'react-intl'
import { createTechniqueDrawerMessages } from '../messages'

interface Props {
  open: boolean
  onClose?: () => void
}
const CreateTechniqueDrawer = ({ open, onClose }: Props): ReactElement => {
  const { formatMessage } = useIntl()

  const handleSubmit = async (values: FormValues): Promise<void> => {
    console.log(values)
  }

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

        <TechniqueForm onSubmit={handleSubmit} open={open} />
      </div>
    </Drawer>
  )
}

export default CreateTechniqueDrawer
