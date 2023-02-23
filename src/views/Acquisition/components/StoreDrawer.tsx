import { ReactElement } from 'react'
import Button from 'components/Button'
import Drawer from 'components/Drawer'
import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'
import { useFormatMessage } from 'hooks/useIntl'
import { createMessages } from '../messages'

interface Props {
  open: boolean
  onClose?: () => void
}
const StoreDrawer = ({ open, onClose }: Props): ReactElement => {
  const getMessage = useFormatMessage(createMessages)

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      className="bg-background-secondary w-80"
      title={
        <div>
          <Typography variant="title" style="bold" className="uppercase">
            {getMessage('title')}
          </Typography>
          <p className="text-sm leading-tight mb-4">{getMessage('subtitle')}</p>
        </div>
      }
    >
      <div className="px-1">
        <p className="text-sm italic">{getMessage('line')}</p>
        <TextField />

        <p className="text-sm italic mt-4">{getMessage('source')}</p>
        <TextField />

        <div className="text-right mt-4">
          <Button variant="contained" color="primary">
            {getMessage('save')}
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export default StoreDrawer
