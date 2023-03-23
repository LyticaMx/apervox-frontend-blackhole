import { ReactElement, useState } from 'react'
import { format } from 'date-fns'

import {
  ClipboardDocumentIcon,
  DocumentChartBarIcon,
  DocumentMagnifyingGlassIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

import IconButton from 'components/Button/IconButton'
import Checkbox from 'components/Form/Checkbox'
import Typography from 'components/Typography'
import { Objective } from 'types/technique'

import BasicInfo from './ObjectiveBasicInfo'
import DeleteObjectiveDialog from './DeleteObjectiveDialog'
import Tooltip from 'components/Tooltip'

interface Props {
  data: Objective
  isChecked: boolean
  onClick: (item: Objective) => void
  onCheck: (item: Objective) => void
}

const ObjectiveCard = ({
  data,
  isChecked,
  onClick,
  onCheck
}: Props): ReactElement => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleOpenDeleteDialog = (e): void => {
    e?.stopPropagation()
    setOpenDeleteDialog(true)
  }
  const handleCloseDeleteDialog = (): void => setOpenDeleteDialog(false)

  const handleRemoveObjective = (): void => {
    /* Filter or call API for update objective list */
    handleCloseDeleteDialog()
  }

  return (
    <div className="w-full flex justify-center">
      <button
        className="p-3 border border-slate-200 rounded-lg hover:shadow-md w-10/12"
        onClick={() => onClick(data)}
      >
        <BasicInfo name={data.name} phoneNumber={data.phone_number} />
        <div className="flex flex-col items-start">
          <Typography variant="body2" style="semibold">
            Creación:
            <span className="font-normal ml-1">
              {format(new Date(data.created_at), 'dd/mm/yyyy - HH:mm:ss')}
            </span>
          </Typography>
          <Typography variant="body2" style="semibold">
            Finalización:
            <span className="font-normal ml-1">
              {format(new Date(data.expires_at), 'dd/mm/yyyy - HH:mm:ss')}
            </span>
          </Typography>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Checkbox
            checked={isChecked}
            onClick={(e) => e?.stopPropagation()}
            onChange={() => onCheck(data)}
          />
          <div className="flex">
            <Tooltip
              content="Actividad del objetivo"
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <IconButton
                className="mr-1"
                onClick={(e) => e?.stopPropagation()}
              >
                <DocumentChartBarIcon className="w-4" />
              </IconButton>
            </Tooltip>
            <Tooltip
              content="Formularios"
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <IconButton
                className="mr-1"
                onClick={(e) => e?.stopPropagation()}
              >
                <ClipboardDocumentIcon className="w-4" />
              </IconButton>
            </Tooltip>
            <Tooltip
              content="Historial"
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <IconButton
                className="mr-1"
                onClick={(e) => e?.stopPropagation()}
              >
                <DocumentMagnifyingGlassIcon className="w-4" />
              </IconButton>
            </Tooltip>
            <Tooltip
              content="Eliminar"
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <IconButton className="mr-1" onClick={handleOpenDeleteDialog}>
                <TrashIcon className="w-4" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </button>
      <DeleteObjectiveDialog
        open={openDeleteDialog}
        objectivePhone={data.phone_number}
        onClose={handleCloseDeleteDialog}
        onAccept={handleRemoveObjective}
      />
    </div>
  )
}

export default ObjectiveCard
