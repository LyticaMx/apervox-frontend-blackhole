import { ReactElement, useState } from 'react'
import { format } from 'date-fns'
import { useIntl } from 'react-intl'

import {
  ClipboardDocumentIcon,
  DocumentChartBarIcon,
  DocumentMagnifyingGlassIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

import { useGlobalMessage } from 'hooks/useIntl'
import IconButton from 'components/Button/IconButton'
import Checkbox from 'components/Form/Checkbox'
import Typography from 'components/Typography'
import Tooltip from 'components/Tooltip'

import BasicInfo from './TargetBasicInfo'
import DeleteTargetDialog from './DeleteTargetDialog'
import { targetCardMessages } from '../messages'
import { useTargets } from 'context/Targets'
import { Target } from 'types/target'
import clsx from 'clsx'

interface Props {
  data: Target
  selected: boolean
  isChecked: boolean
  onClick: (item: Target) => void
  onCheck: (item: Target) => void
}

const TargetCard = ({
  data,
  isChecked,
  selected,
  onClick,
  onCheck
}: Props): ReactElement => {
  const { actions } = useTargets()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const { formatMessage } = useIntl()
  const getGlobalMessage = useGlobalMessage()

  const handleOpenDeleteDialog = (e): void => {
    e?.stopPropagation()
    setOpenDeleteDialog(true)
  }
  const handleCloseDeleteDialog = (): void => setOpenDeleteDialog(false)

  const handleRemoveTarget = async (): Promise<void> => {
    /* Filter or call API for update target list */
    const res = await actions?.delete(data.id)

    if (res) {
      handleCloseDeleteDialog()
    }
  }

  return (
    <div className="">
      <div
        className={clsx(
          'p-3 bg-neutral-50 rounded-lg w-full cursor-pointer border border-transparent',
          {
            '!border-primary': selected
          }
        )}
        onClick={() => onClick(data)}
      >
        <BasicInfo name={data.alias} phoneNumber={data.phone} />
        <div className="flex flex-col items-start">
          <Typography variant="body2" style="semibold">
            {`${formatMessage(targetCardMessages.creation)}:`}
            <span className="font-normal ml-1">
              {format(new Date(data.created_at ?? 0), 'dd/mm/yyyy - HH:mm:ss')}
            </span>
          </Typography>
          <Typography variant="body2" style="semibold">
            {`${formatMessage(targetCardMessages.finalization)}:`}
            <span className="font-normal ml-1">
              {format(new Date(data.end_date ?? 0), 'dd/MM/yyyy')}
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
              content={formatMessage(targetCardMessages.activity)}
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
              content={formatMessage(targetCardMessages.forms)}
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
              content={formatMessage(targetCardMessages.history)}
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
      <DeleteTargetDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onAccept={handleRemoveTarget}
      />
    </div>
  )
}

export default TargetCard
