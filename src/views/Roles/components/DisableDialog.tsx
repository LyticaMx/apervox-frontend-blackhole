import { ReactElement } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

import Dialog from 'components/Dialog'
import Button from 'components/Button'
import Switch from 'components/Form/Switch'

interface Props {
  open?: boolean
  audioName?: string
  groupName?: string
  onClose?: (event?: any) => void
  onAccept?: () => void
}

const DisableDialog = ({
  open = true,
  onClose = () => {},
  onAccept = () => {}
}: Props): ReactElement => {
  return (
    <Dialog open={open} onClose={onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-primary m-auto mb-2" />
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Deshabilitar rol de usuario
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            El rol de usuario seleccionado se encuentra habilitado.
          </p>
          <div className="flex justify-center items-center text-sm gap-2 my-4">
            <span>Deshabilitar</span>
            <Switch color="indigo" size="sm" />
            <span>Habilitar</span>
          </div>
        </div>
      </div>
      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="contained" color="primary" onClick={onAccept}>
          Aceptar
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Dialog>
  )
}

export default DisableDialog
