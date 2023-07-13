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
import Checkbox from 'components/Form/Checkbox'
import Typography from 'components/Typography'

import BasicInfo from './TargetBasicInfo'
import DeleteTargetDialog from './DeleteTargetDialog'
import { targetCardMessages } from '../messages'
import { useTargets } from 'context/Targets'
import { Target } from 'types/target'
import clsx from 'clsx'
import TargetCardAction from './TargetCardAction'
import { useTechnique } from 'context/Technique'
import MetadataDialog from './MetadataDialog'

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
  const { actions: actionsTechnique } = useTechnique()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openMetadataDialog, setOpenMetadataDialog] = useState(false)
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

  const handleShowForms = async (): Promise<void> => {
    const res = await actionsTechnique?.showForms(data)

    if (!res) {
      setOpenMetadataDialog(true)
    }
  }

  const actionsCard = [
    {
      content: formatMessage(targetCardMessages.activity),
      icon: <DocumentChartBarIcon className="w-4" />,
      action: (e) => e?.stopPropagation()
    },
    {
      content: formatMessage(targetCardMessages.forms),
      icon: <ClipboardDocumentIcon className="w-4" />,
      action: (e) => {
        e?.stopPropagation()
        handleShowForms()
      }
    },
    {
      content: formatMessage(targetCardMessages.history),
      icon: <DocumentMagnifyingGlassIcon className="w-4" />,
      action: (e) => e?.stopPropagation()
    },
    {
      content: getGlobalMessage('delete', 'actionsMessages'),
      icon: <TrashIcon className="w-4" />,
      action: handleOpenDeleteDialog
    }
  ]

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
        <div className="flex justify-between items-center mt-1">
          <Checkbox
            checked={isChecked}
            onClick={(e) => e?.stopPropagation()}
            onChange={() => onCheck(data)}
          />
          <div className="flex pag-2">
            {actionsCard.map((item, index) => (
              <TargetCardAction
                key={index}
                content={item.content}
                onClick={item.action}
              >
                {item.icon}
              </TargetCardAction>
            ))}
          </div>
        </div>
      </div>
      <DeleteTargetDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onAccept={handleRemoveTarget}
      />

      <MetadataDialog
        targetId={data.id}
        open={openMetadataDialog}
        onClose={() => setOpenMetadataDialog(false)}
        onSubmit={() => {
          setOpenMetadataDialog(false)
          handleShowForms()
        }}
      />
    </div>
  )
}

export default TargetCard
