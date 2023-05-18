import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { OverflowLine } from 'types/overflowLine'
import { editMessages } from '../messages'
import { generalMessages } from 'globalMessages'
import { format } from 'date-fns'
import OverflowLineForm, { FormValues } from './OverflowLineForm'
import { useOverflowLine } from 'context/OverflowLines'
import useToast from 'hooks/useToast'

interface Props {
  overflowLine: OverflowLine | null
  open: boolean
  onClose?: () => void
}

const EditOverflowLineDrawer = ({
  overflowLine,
  open,
  onClose
}: Props): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions: overflowLineActions } = useOverflowLine()
  const toast = useToast()

  const handleEdit = async (values: FormValues): Promise<void> => {
    try {
      const updated = await overflowLineActions?.update({
        id: overflowLine?.id ?? '',
        phone: values.phone,
        medium: {
          id: values.medium
        }
      })
      if (updated) {
        toast.success(formatMessage(editMessages.success))
        await overflowLineActions?.get()
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
          {formatMessage(editMessages.title)}
        </Typography>
        <Typography variant="body2" className="leading-tight mb-4">
          {formatMessage(editMessages.subtitle)}
        </Typography>
        <span className="text-sm mb-4 text-gray-400">
          {formatMessage(generalMessages.createdOn, {
            date: format(
              new Date(overflowLine?.createdOn ?? 0),
              'dd/MM/yyyy - hh:mm'
            )
          })}
          <span className="ml-2">{overflowLine?.createdBy ?? ''}</span>
        </span>
        <OverflowLineForm
          onSubmit={handleEdit}
          initialvalues={{
            medium: overflowLine?.medium.id ?? '',
            phone: overflowLine?.phone ?? ''
          }}
        />
      </div>
    </Drawer>
  )
}

export default EditOverflowLineDrawer
