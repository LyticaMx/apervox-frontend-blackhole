import { ReactElement, useState } from 'react'
import { format } from 'date-fns'
import { useIntl } from 'react-intl'

import {
  ClipboardDocumentIcon,
  DocumentChartBarIcon,
  DocumentMagnifyingGlassIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

import { Target } from 'types/technique'

import { useGlobalMessage } from 'hooks/useIntl'
import IconButton from 'components/Button/IconButton'
import Checkbox from 'components/Form/Checkbox'
import Typography from 'components/Typography'
import Tooltip from 'components/Tooltip'

import BasicInfo from './ObjectiveBasicInfo'
import DeleteObjectiveDialog from './DeleteObjectiveDialog'
import { objectiveCardMessages } from '../messages'

interface Props {
  data: Target
  isChecked: boolean
  onClick: (item: Target) => void
  onCheck: (item: Target) => void
}

const ObjectiveCard = ({
  data,
  isChecked,
  onClick,
  onCheck
}: Props): ReactElement => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const { formatMessage } = useIntl()
  const getGlobalMessage = useGlobalMessage()

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
    <div className="">
      <div
        className="p-3 bg-neutral-50 rounded-lg w-full cursor-pointer"
        onClick={() => onClick(data)}
      >
        <BasicInfo name={data.name} phoneNumber={data.phone_number} />
        <div className="flex flex-col items-start">
          <Typography variant="body2" style="semibold">
            {`${formatMessage(objectiveCardMessages.creation)}:`}
            <span className="font-normal ml-1">
              {format(new Date(data.created_at), 'dd/mm/yyyy - HH:mm:ss')}
            </span>
          </Typography>
          <Typography variant="body2" style="semibold">
            {`${formatMessage(objectiveCardMessages.finalization)}:`}
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
              content={formatMessage(objectiveCardMessages.activity)}
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
              content={formatMessage(objectiveCardMessages.forms)}
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
              content={formatMessage(objectiveCardMessages.history)}
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
              content={getGlobalMessage('delete', 'actionsMessages')}
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
      </div>
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
