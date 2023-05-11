import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { VerificationLine } from '../Verification'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { editVerificationLineMessages } from '../messages'
import { generalMessages } from 'globalMessages'
import { format } from 'date-fns'
import VerificationLineForm from './VerificationLineForm'

interface Props {
  verificationLine: VerificationLine | null
  open: boolean
  onClose?: () => void
}

const EditVerificationLineDrawer = ({
  verificationLine,
  open,
  onClose
}: Props): ReactElement => {
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
          {formatMessage(editVerificationLineMessages.title)}
        </Typography>
        <span className="text-sm mb-4 text-gray-400">
          {formatMessage(generalMessages.createdOn, {
            date: format(
              new Date(verificationLine?.createdOn ?? 0),
              'dd/MM/yyyy - hh:mm'
            )
          })}
          <span className="ml-2">{verificationLine?.createdBy ?? ''}</span>
        </span>
        <VerificationLineForm
          onSubmit={async () => {}}
          initialValues={{
            phone: verificationLine?.phone ?? ''
          }}
        />
      </div>
    </Drawer>
  )
}

export default EditVerificationLineDrawer
