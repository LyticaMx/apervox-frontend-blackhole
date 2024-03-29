import { ReactElement } from 'react'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import TechniqueForm, { FormValues } from './TechniqueForm'
import { useIntl } from 'react-intl'
import { createTechniqueDrawerMessages } from '../messages'
import { useTechniques } from 'context/Techniques'
import useToast from 'hooks/useToast'
import { set } from 'date-fns'

interface Props {
  open: boolean
  onClose?: () => void
}
const CreateTechniqueDrawer = ({ open, onClose }: Props): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions: techniqueActions } = useTechniques()
  const { launchToast } = useToast()

  const handleSubmit = async (values: FormValues): Promise<void> => {
    if (!values.endDate) return

    const created = await techniqueActions?.create({
      name: values.name,
      description: values.description,
      starts_at: values.startDate?.toISOString() ?? '',
      expires_at:
        set(values.endDate, {
          hours: 23,
          minutes: 59,
          seconds: 59,
          milliseconds: 999
        }).toISOString() ?? '',
      // notificationTime: parseInt(values.advanceTime),
      // notificationTimeUnit: values.advanceTimeType,
      notificationDays: +values.notificationDays,
      notificationHours: +values.notificationHours,
      groups: values.groups.map((group) => group.value),
      priority: values.priority,
      shift: values.shift,
      reportEvidenceEvery: values.court,
      targets: values.targets
    })
    if (created) {
      launchToast({
        title: formatMessage(createTechniqueDrawerMessages.success),
        type: 'Success'
      })
      await techniqueActions?.get({ page: 1 }, true)
      onClose?.()
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
