import { ReactElement } from 'react'

import Dialog from 'components/Dialog'
import { Objective } from 'types/technique'
import Typography from 'components/Typography'
import ObjectiveForm from './ObjectiveForm'

interface Props {
  open?: boolean
  selected?: Number
  onClose?: (event?: any) => void
  onAccept?: (objective: Objective) => void
}

const CreateObjectiveDialog = ({
  open = true,
  onClose = () => {},
  onAccept
}: Props): ReactElement => {
  return (
    <Dialog open={open} onClose={onClose} size="md" padding="none">
      <div className="bg-white px-8 py-5">
        <Typography variant="title" style="bold" className="uppercase">
          Agregar objetivo
        </Typography>
        <Typography className="leading-tight my-2">
          Selecciona el tipo de objetivo que será agregado a la técnica y
          completa los datos del formulario.
        </Typography>
        <ObjectiveForm onSubmit={onAccept as any} />
      </div>
    </Dialog>
  )
}

export default CreateObjectiveDialog
