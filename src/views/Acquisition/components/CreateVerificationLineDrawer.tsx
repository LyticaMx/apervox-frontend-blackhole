import { ReactElement, useRef } from 'react'
import { FormikContextType } from 'formik'
import { useDidMountEffect } from 'hooks/useDidMountEffect'
import VerificationLineForm, { FormValues } from './VerificationLineForm'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { useIntl } from 'react-intl'
import { createVerificationLineMessages } from '../messages'
import { useVerificationLine } from 'context/VerificationLines'
import useToast from 'hooks/useToast'

interface Props {
  open: boolean
  onClose?: () => void
}

const CreateVerificationLineDrawer = ({
  open,
  onClose
}: Props): ReactElement => {
  const formikRef = useRef<FormikContextType<FormValues>>()
  const { actions: verificationLineActions } = useVerificationLine()
  const { formatMessage } = useIntl()
  const toast = useToast()

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const created = await verificationLineActions?.create({
        phone: values.phone
      })
      if (created) {
        toast.success(formatMessage(createVerificationLineMessages.success))
        onClose?.()
        await verificationLineActions?.get({}, true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useDidMountEffect(() => {
    if (!open) {
      setTimeout(() => {
        formikRef.current?.resetForm()
      }, 300)
    }
  }, [open])

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      className="bg-background-secondary"
    >
      <div className="w-80 h-full flex flex-col px-2">
        <Typography variant="title" style="bold" className="uppercase">
          {formatMessage(createVerificationLineMessages.title)}
        </Typography>
        <Typography variant="body2" className="leading-tight mb-4">
          {formatMessage(createVerificationLineMessages.subtitle)}
        </Typography>
        <VerificationLineForm onSubmit={handleSubmit} formikRef={formikRef} />
      </div>
    </Drawer>
  )
}

export default CreateVerificationLineDrawer
