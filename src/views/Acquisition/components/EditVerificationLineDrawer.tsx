import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { VerificationLine } from 'types/verificationLine'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { editVerificationLineMessages } from '../messages'
import { generalMessages } from 'globalMessages'
import { format } from 'date-fns'
import VerificationLineForm, { FormValues } from './VerificationLineForm'
import useToast from 'hooks/useToast'
import { useVerificationLine } from 'context/VerificationLines'

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
  const { actions: verificationLineActions } = useVerificationLine()
  const toast = useToast()

  const handleEdit = async (values: FormValues): Promise<void> => {
    try {
      const updated = await verificationLineActions?.update({
        id: verificationLine?.id,
        phone: values.phone
      })
      if (updated) {
        toast.success(formatMessage(editVerificationLineMessages.success))
        await verificationLineActions?.get()
        onClose?.()
      }
    } catch (e) {
      console.error(e)
    }
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
          onSubmit={handleEdit}
          initialValues={{
            phone: verificationLine?.phone ?? ''
          }}
        />
      </div>
    </Drawer>
  )
}

export default EditVerificationLineDrawer
