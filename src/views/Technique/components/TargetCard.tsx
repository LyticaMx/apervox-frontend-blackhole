import { ReactElement, useMemo, useState } from 'react'
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
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import { useSpecificModelAudits } from 'context/Audit'
import { TechniqueTabs } from 'types/technique'
import useToast from 'hooks/useToast'

interface Props {
  data: Target
  isChecked: boolean
  onCheck: (item: Target) => void
}

const TargetCard = ({ data, isChecked, onCheck }: Props): ReactElement => {
  const { actions } = useTargets()
  const { actions: actionsTechnique, target, activeTab } = useTechnique()
  const { actions: specificModuleAuditActions } = useSpecificModelAudits()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openMetadataDialog, setOpenMetadataDialog] = useState(false)
  const { formatMessage } = useIntl()
  const getGlobalMessage = useGlobalMessage()
  const ability = useAbility()
  const toast = useToast()

  const selected = useMemo(() => target?.id === data.id, [target, data])

  const handleOpenDeleteDialog = (e): void => {
    e?.stopPropagation()
    setOpenDeleteDialog(true)
  }
  const handleCloseDeleteDialog = (): void => setOpenDeleteDialog(false)

  const handleRemoveTarget = async (): Promise<void> => {
    /* Filter or call API for update target list */
    const res = await actions?.delete(data.id)

    if (res) {
      await actions?.getData({ page: 1 })
      handleCloseDeleteDialog()
      toast.success(
        formatMessage(targetCardMessages.deleteSuccess, { quantity: 1 })
      )
    } else {
      toast.danger(
        formatMessage(targetCardMessages.deleteError, { quantity: 1 })
      )
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
      },
      disabled: ability.cannot(ACTION.READ, SUBJECT.TARGET_METADATA)
    },
    {
      content: formatMessage(targetCardMessages.history),
      icon: <DocumentMagnifyingGlassIcon className="w-4" />,
      action: (e) => {
        e?.stopPropagation()
        specificModuleAuditActions?.setModelId(data.id)
      }
    },
    {
      content: getGlobalMessage('delete', 'actionsMessages'),
      icon: <TrashIcon className="w-4" />,
      action: handleOpenDeleteDialog,
      disabled: ability.cannot(ACTION.DELETE, SUBJECT.TARGETS)
    }
  ]

  const handleClick = (): void => {
    if (ability.cannot(ACTION.READ, SUBJECT.TARGET_METADATA)) return
    if (target?.id === data.id) actionsTechnique?.setTarget(undefined)
    else {
      if (!data.metadata_id && activeTab === TechniqueTabs.FORMS) {
        actionsTechnique?.setActiveTab(TechniqueTabs.GENERAL_DATA)
      }
      actionsTechnique?.setTarget(data)
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
        onClick={handleClick}
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
              {data.has_end_date
                ? format(new Date(data.end_date ?? 0), 'dd/MM/yyyy')
                : 'n/a'}
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
                disabled={item.disabled}
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
