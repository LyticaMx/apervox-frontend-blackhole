/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormikContextType } from 'formik'
import { ReactElement, useRef } from 'react'
import OverflowLineForm, { FormValues } from './OverflowLineForm'
import { useIntl } from 'react-intl'
import { useDidMountEffect } from 'hooks/useDidMountEffect'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { createMessages } from '../messages'
import useToast from 'hooks/useToast'
import { useOverflowLine } from 'context/OverflowLines'

interface Props {
  open: boolean
  onClose?: () => void
}

const CreateOverflowLineDrawer = ({ open, onClose }: Props): ReactElement => {
  const formikRef = useRef<FormikContextType<FormValues>>()
  const { formatMessage } = useIntl()
  const { actions: overflowLineActions } = useOverflowLine()
  const toast = useToast()

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const created = await overflowLineActions?.create({
        phone: values.phone,
        medium_id: values.medium.value as string
      })
      if (created) {
        toast.success(formatMessage(createMessages.success))
        onClose?.()
        await overflowLineActions?.get({}, true)
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
          {formatMessage(createMessages.title)}
        </Typography>
        <Typography variant="body2" className="leading-tight mb-4">
          {formatMessage(createMessages.subtitle)}
        </Typography>
        <OverflowLineForm formikRef={formikRef} onSubmit={handleSubmit} />
      </div>
    </Drawer>
  )
}

export default CreateOverflowLineDrawer
