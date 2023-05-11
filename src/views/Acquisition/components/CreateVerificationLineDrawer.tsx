import { ReactElement, useRef } from 'react'
import { FormikContextType } from 'formik'
import { useDidMountEffect } from 'hooks/useDidMountEffect'
import VerificationLineForm, { FormValues } from './VerificationLineForm'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { useIntl } from 'react-intl'
import { createVerificationLineMessages } from '../messages'

interface Props {
  open: boolean
  onClose?: () => void
}

const CreateVerificationLineDrawer = ({
  open,
  onClose
}: Props): ReactElement => {
  const formikRef = useRef<FormikContextType<FormValues>>()
  const { formatMessage } = useIntl()

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
        <VerificationLineForm onSubmit={async () => {}} formikRef={formikRef} />
      </div>
    </Drawer>
  )
}

export default CreateVerificationLineDrawer
